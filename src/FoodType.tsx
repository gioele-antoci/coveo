import * as React from 'react';

import { IListFieldValuesRequest, IIndexFieldValue, IQueryResults } from 'coveo-search-ui';
import * as InfiniteScroll from 'react-infinite-scroller';
import queryHelper from './queryHelper';
import './css/FoodType.css';

type extendedRecipe = { recipeResult: IIndexFieldValue, img: string };

export default class FoodType extends React.Component<
    { active?: string, onChoice: (choice: string) => void },
    { recipes: extendedRecipe[], activeReceipe: string, isLoading: boolean, hasMoreItems: boolean }> {

    private top = 20;
    private skip = 0;
    private allRecipies: IIndexFieldValue[] = [];

    constructor(props) {
        super(props);
        this.state = ({ isLoading: false, recipes: [], activeReceipe: "", hasMoreItems: true });
    }

    componentDidMount() {
        if (this.state.recipes.length) {
            return;
        }

        //Start searching...
        this.setState({ isLoading: true });
        this.search();
    }

    private search(): void {
        queryHelper.searchField({
            field: "@tpaccordsnommenu",
            maximumNumberOfValues: 100000,
            sortCriteria: "Occurrences"
        }).then(values => {
            //Render everything, no images yet
            this.allRecipies = values;
            this.renderSlicedRecipies(this.skip);
        });
    }

    private renderSlicedRecipies(skip: number) {
        const slicedRecipes = this.allRecipies.slice(skip, this.top + skip);

        //For each result go lookup an image
        //When all images are done loading, reset state which will trigger a rendering
        Promise.all(slicedRecipes.map(value => this.lookupValue(value)))
            .then(recipesWithImages => {
                const recipes = this.state.recipes.slice();
                recipesWithImages.forEach(recipe => recipes.push(this.updateRecipe(recipesWithImages, recipe)));
                this.setState({ recipes });
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    private updateRecipe(recipes: extendedRecipe[], recipeWithImage: extendedRecipe): extendedRecipe {
        //Update recipe with image uri and return it
        const uri: string = recipeWithImage.img.split(";")[0];
        let matchedRecipe = recipes.find(x => x.recipeResult.value === recipeWithImage.recipeResult.value) as extendedRecipe;
        matchedRecipe = Object.assign({}, matchedRecipe, { img: uri });
        return matchedRecipe;
    }

    private lookupValue(value: IIndexFieldValue): Promise<extendedRecipe> {
        //Search for recipe image, when it returns wrap response in a 'extendedRecipe' obj and resolve promise with it
        return new Promise<extendedRecipe>((resolve, reject) => {
            queryHelper.search({ fieldsToInclude: ["@tpaccordstumbnailuriraw"], numberOfResults: 1, aq: `"${value.lookupValue}"`, q: "" })
                .then(x => resolve({
                    img: x.results[0].raw.tpaccordstumbnailuriraw,
                    recipeResult: value
                } as extendedRecipe))
                .catch(reason => {
                    console.log(reason);
                    resolve({
                        img: "",
                        recipeResult: value
                    });
                });
        });
    }

    private onChoice(choice: string): void {
        this.setState({ activeReceipe: choice });
        this.props.onChoice(choice);
    }

    private loadMore(): void {
        this.skip += 20;
        this.setState({ hasMoreItems: this.state.recipes.length < this.allRecipies.length });
        this.renderSlicedRecipies(this.skip);
    }

    render() {
        let items = this.state.recipes.map(recipe =>
            <div className={`recipe card ${this.state.activeReceipe === recipe.recipeResult.value ? "selected" : ""}`}
                title={recipe.recipeResult.value} onClick={() => this.onChoice(recipe.recipeResult.value)} key={recipe.recipeResult.value}>
                <div className="recipe-title">{recipe.recipeResult.value}</div>
                <img className="recipe-image" src={recipe.img || ""} />
                <div className="recipe-drinks">{recipe.recipeResult.numberOfResults} drinks paired</div>
            </div>);

        return (
            (<InfiniteScroll
                pageStart={0}
                loadMore={() => this.loadMore()}
                hasMore={this.state.hasMoreItems}
                loader={<div className="infinite-loader">Loading ...</div>}
                initialLoad={false}
            >
                <div className="FoodType"><div className="recipes-container">{items}</div>    </div>
            </InfiniteScroll>)

            /*(  <div className="FoodType"><div className="recipes-container">{items}</div>    </div>)*/
        )
    }
}