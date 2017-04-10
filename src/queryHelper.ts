import {
    QueryBuilder, SearchEndpoint, IGroupByRequest, ExpressionBuilder, IQuery,
    IQueryResults, IIndexFieldValue, IListFieldValuesRequest
} from 'coveo-search-ui';

export default class queryHelper {

    private static queryBuilder: QueryBuilder;
    private static endpoint: SearchEndpoint;

    private static getGroupBy(): IGroupByRequest[] {
        return [
            "@tpenspecial",
            "@tpprixnum",
            "@tpdisponibilite",
            "@tpcategorie",
            "@tppays",
            "@tpregion",
            "@tpmillesime",
            "@tpcepagenomsplitgroup",
            "@tpinventairenomsuccursalesplitgroup",
            "@tpclassification",
            "@tppastilledegout",
            "@tpfamilledevinsplitgroup",
            "@tpaccordsnommenu",
            "@tpparticularitesplitgroup",
            "@tpobservationsgustativesacidite",
            "@tpobservationsgustativescorps",
            "@tpobservationsgustativestannins",
            "@tpobservationsgustativestexture"
        ].map(field => {
            return {
                field,
                maximumNumberOfValues: 10000,
                sortCriteria: "occurrences"
            } as IGroupByRequest
        });
    }

    static addExpression(field: string, values: string[], operator = "=="): void {
        const builder = new ExpressionBuilder();
        builder.addFieldExpression(field, operator, values);
        this.queryBuilder.advancedExpression.fromExpressionBuilder(builder);
    }

    static addNotExpression(field: string, values: string[]): void {
        const builder = new ExpressionBuilder();
        builder.addFieldNotEqualExpression(field, values);
        this.queryBuilder.advancedExpression.fromExpressionBuilder(builder);
    }

    static setup(): void {
        this.queryBuilder = new QueryBuilder();
        this.queryBuilder.groupByRequests = this.getGroupBy();

        SearchEndpoint.endpoints["default"] = this.endpoint = new SearchEndpoint({ accessToken: "058c85fd-3c79-42a3-9236-b83d35588103", restUri: "https://cloudplatform.coveo.com/rest/search" });
    }

    static search(query?: IQuery): Promise<IQueryResults> {
        const newQuery = this.queryBuilder.build();
        return this.endpoint.search(Object.assign({}, newQuery, query));
    }

    static searchField(request: IListFieldValuesRequest): Promise<IIndexFieldValue[]> {
        return this.endpoint.listFieldValues(request);
    }

}