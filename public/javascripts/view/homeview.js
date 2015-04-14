App.PaginationView = Ember.View.extend({
    templateName: 'pagination',
    tagName: 'li',
    page: function() {
        return Ember.Object.create({id: this.get('content.page_id')});
    }.property()
});


App.PreviousnextView = Ember.View.extend({
    didInsertElement:function(){
    if (prevPage == 0){
    $("#prev").hide();
    }
    if(nextPage > availablePages)
    {
    $("#next").hide();
    }

    }
});

