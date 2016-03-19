'use strict';

angular.module('myContacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'myContactsCtrl'
  });
}])

.controller('myContactsCtrl', ['$scope','$firebaseArray',
function($scope,$firebaseArray) {

//new firebase object    
    var ref = new Firebase("https://mycon.firebaseio.com/contacts");
//creating array from firebase object
    $scope.contacts = $firebaseArray(ref);
//showing and hidding ADD form    
    $scope.showForm = false;    
    $scope.addShowForm = function(){   
     $scope.showForm = true;  
    }
    $scope.addHideForm = function(){ 
     $scope.showForm = false;  
    }
    
//adding new contact via form
    $scope.addFormSubmit = function(){
//every var must have value either from ng-model or its null      
      if($scope.name){ var name = $scope.name }else{ var name = null };
      if($scope.email){ var email = $scope.email }else{ var email = null };
      if($scope.company){ var company = $scope.company }else{ var company = null };
      if($scope.work_phone){ var work_phone = $scope.work_phone }else{ var work_phone = null };
      if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone }else{ var mobile_phone = null };
      if($scope.home_phone){ var home_phone = $scope.home_phone }else{ var home_phone = null };
      if($scope.street){ var street = $scope.street }else{ var street = null };
      if($scope.city){ var city = $scope.city }else{ var city = null };
      if($scope.country){ var country = $scope.country }else{ var country = null };
      if($scope.zip_code){ var zip_code = $scope.zip_code }else{ var zip_code = null };
    
//adding new object to the firebase array        
      $scope.contacts.$add({
          name: name,
          email: email,
          company: company,
          phones : [
              {
                work: work_phone,
                home: home_phone,
                mobile: mobile_phone   
              }
          ],
          address: [
               {
                 street: street,
                 city: city,
                 country: country,
                 zip: zip_code 
               }
          ]
      }).then(function(ref){          
          var id = ref.key();
//claering all fields after submit
          clearFields();
//hiding form          
          $scope.showForm = false;
//message after submiting
          $scope.msg = "Contact added";  
      })   
    }
 
//resets all fields
    function clearFields(){
         $scope.name = "";
         $scope.email = "";
         $scope.mobile_phone = "";
         $scope.work_phone = "";
         $scope.home_phone = "";
         $scope.street = "";
         $scope.city = "";
         $scope.zip_code = "";
         $scope.country = "";
         $scope.company = "";
    }
//showing contact details     
    $scope.showContact = function(contact){
//showing form      
        $scope.contactShow  = true;
//values of the showing form are taken from firebase object         
         $scope.name = contact.name;
         $scope.email = contact.email;
         $scope.mobile_phone = contact.phones[0].mobile;
         $scope.work_phone = contact.phones[0].work;
         $scope.home_phone = contact.phones[0].home;
         $scope.street = contact.address[0].street;
         $scope.city = contact.address[0].city;
         $scope.zip_code = contact.address[0].zip;
         $scope.country = contact.address[0].country;
         $scope.company = contact.company;
    }
//hiding contact details form    
    $scope.hideContact = function(){ 
        $scope.contactShow = false;
    }
  
//showing from for editing
    $scope.showEditForm = function(contact){
        $scope.editShowForm = true;
//form values are taken from firebase object with matching id
         $scope.id = contact.$id;
         $scope.name = contact.name;
         $scope.email = contact.email;
         $scope.mobile_phone = contact.phones[0].mobile;
         $scope.work_phone = contact.phones[0].work;
         $scope.home_phone = contact.phones[0].home;
         $scope.street = contact.address[0].street;
         $scope.city = contact.address[0].city;
         $scope.zip_code = contact.address[0].zip;
         $scope.country = contact.address[0].country;
         $scope.company = contact.company;   
    }
//submiting edit form
    $scope.editFormSubmit = function(){
//setting firebase object property   with matching id       
        var id = $scope.id;
        var record = $scope.contacts.$getRecord(id);
//object property is equal to the ng-model    
        record.name = $scope.name;
        record.email = $scope.email;
        record.phones[0].mobile = $scope.mobile_phone;
        record.phones[0].work = $scope.work_phone;
        record.phones[0].home = $scope.home_phone;
        record.address[0].street = $scope.street;
        record.address[0].city = $scope.city;
        record.address[0].zip = $scope.zip_code;
        record.address[0].country = $scope.country;
        record.company = $scope.company;
//saving changes        
        $scope.contacts.$save(record).then(function(ref){
            console.log(ref.key());
//clearing form fields            
            clearFields();
            $scope.msg = "Contact Edited"; 
     })
//hidding edit form
        $scope.editShowForm = false;
    }
//deleting contact
    $scope.removeContact = function(contact){ 
        $scope.contacts.$remove(contact);
    }
}]);