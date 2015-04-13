var get = Ember.get, set = Ember.set;

var prevPage;
var nextPage;
var availablePages;

Ember.PaginationMixin = Ember.Mixin.create({

  pages: function() {

    var availablePages = this.get('availablePages'),
    pages = [],
    page;

    for (i = 0; i < availablePages; i++) {
      page = i + 1;
      pages.push({ page_id: page.toString() });
    }

    return pages;

  }.property('availablePages'),

  currentPage: function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }.property('selectedPage'),

  nextPage: function() {

    nextPage = this.get('currentPage') + 1;
    availablePages = this.get('availablePages');
    
    if (nextPage <= availablePages) {
        $("#next").show();
        return Ember.Object.create({id: nextPage});
    }else{
          $("#next").hide();
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }.property('currentPage', 'availablePages'),

  prevPage: function() {

    prevPage = this.get('currentPage') - 1;

    if (prevPage == 0){
       $("#prev").hide();
       return Ember.Object.create({id: this.get('currentPage')});
       }
   else{
        $("#prev").show();
        return Ember.Object.create({id: prevPage});
      }

  }.property('currentPage'),

  availablePages: function() {

    return Math.ceil((this.get('content.length') / this.get('itemsPerPage')) || 1);

  }.property('content.length'),

  paginatedContent: function() {

    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('content');

    return models.slice(lowerBound, upperBound);

  }.property('selectedPage', 'content.@each')

});
