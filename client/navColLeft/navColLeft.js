Template.navColLeft.events({
    /**
     * @function
     * @summary Reduces the first date displayed by one day
     * @listens click on the left chevron in the left hand navbar
     */
   'click #minusOneDay': function() {
       var startDate = Session.get('startDate') || Helper.parseADate(new Date()); // If there's already a start date, get it, otherwise, create it.
       startDate = new Date(startDate); // convert it into a date
       startDate = startDate.setDate(startDate.getDate() - 1); // reduce the number by one
       startDate = Helper.parseADate(new Date(startDate)); // now parse it into a string again
       Session.set('startDate', startDate); // and save it
   },
   /**
     * @function
     * @summary Reduces the first date displayed by five days
     * @listens A click on the double left chevron in the left hand navbar
     */
   'click #minusFiveDays': function() {
       var startDate = Session.get('startDate') || Helper.parseADate(new Date());
       startDate = new Date(startDate);
       startDate = startDate.setDate(startDate.getDate() - 5);
       startDate = Helper.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   /**
     * @function
     * @summary Returns to today
     * @listens A click on the home button in the left hand navbar
     */
   'click #returnToToday': function() {
       var startDate = Helper.parseADate(new Date());
       Session.set('startDate', startDate);
   },
});