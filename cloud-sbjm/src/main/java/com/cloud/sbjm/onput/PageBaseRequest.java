package com.cloud.sbjm.onput;

public class PageBaseRequest extends BaseRequest {

    private Integer limit; //限制

    private Integer startPage; //当前第几页

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getStartPage() {
        return startPage;
    }

    public void setStartPage(Integer startPage) {
        this.startPage = startPage;
    }


}
