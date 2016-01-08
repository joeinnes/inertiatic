Template.navColRight.events({
    /**
     * @function
     * @summary Increases the first date displayed by one day
     * @listens click on the left chevron in the left hand navbar
     */
   'click #addOneDay': function() {
       var startDate = Session.get('startDate') || Helper.parseADate(new Date()); // If there's already a start date, get it, otherwise, create it.
       startDate = new Date(startDate); // convert it into a date
       startDate = startDate.setDate(startDate.getDate() + 1); // increase the number by one
       startDate = Helper.parseADate(new Date(startDate)); // now parse it into a string again
       Session.set('startDate', startDate); // and save it
   },
   /**
     * @function
     * @summary Increases the first date displayed by five days
     * @listens click on the double right chevron in the left hand navbar
     */
   'click #addFiveDays': function() {
       var startDate = Session.get('startDate') || Helper.parseADate(new Date());
       startDate = new Date(startDate);
       startDate = startDate.setDate(startDate.getDate() + 5);
       startDate = Helper.parseADate(new Date(startDate));
       Session.set('startDate', startDate);
   },
   /**
     * @function
     * @summary Allows you to select a start date
     * @listens click on the calendar button in the left hand navbar
     */
   'click #calendar': function() {
       var startDate = Helper.parseADate(new Date());
       Session.set('startDate', startDate);
   },
});