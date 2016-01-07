Template.navColLeft.events({
   'click #minusOneDay': function() {
       var startDate = Session.get('startDate') || Helpers.parseADate(new Date());
       startDate = new Date(startDate);
       startDate = startDate.setDate(startDate.getDate() - 1);
       startDate = Helpers.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   'click #minusFiveDays': function() {
       var startDate = Session.get('startDate') || Helpers.parseADate(new Date());
       startDate = new Date(startDate);
       console.log(startDate);
       startDate = startDate.setDate(startDate.getDate() - 5);
       startDate = Helpers.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   'click #returnToToday': function() {
       var startDate = Helpers.parseADate(new Date());
       Session.set('startDate', startDate);
   },
});