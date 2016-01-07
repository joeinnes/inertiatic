Template.navColRight.events({
   'click #addOneDay': function() {
       var startDate = Session.get('startDate') || Helpers.parseADate(new Date());
       startDate = new Date(startDate);
       startDate = startDate.setDate(startDate.getDate() + 1);
       startDate = Helpers.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   'click #addFiveDays': function() {
       var startDate = Session.get('startDate') || Helpers.parseADate(new Date());
       startDate = new Date(startDate);
       console.log(startDate);
       startDate = startDate.setDate(startDate.getDate() + 5);
       startDate = Helpers.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   'click #returnToToday': function() {
       var startDate = Helpers.parseADate(new Date());
       Session.set('startDate', startDate);
   },
});