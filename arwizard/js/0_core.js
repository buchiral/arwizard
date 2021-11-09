/*
 * Javascript for the ARmanage
 */

$(document).ready(function() {

        $('#dataTables-example').DataTable({
                responsive: true
        });
        
                       $('#qrcode').qrcode({
                        "render": "canvas",
                        "size": 100,
                        "color": "#3a3",
                        "text": $('#qrcode').attr('QRurl')
                    });  
            


                    $( ".qrcode01" ).each(function() {
                          $( this ).qrcode({
                                                "size": 100,
                                                "color": "#3a3",
                                                "text": $(this).attr('QRurl')
                                            });
                                });
                
                  //  $(".fancybox").fancybox();
                    
                    
        // POI Save                 
        jQuery('#save_poi').click(function() {
        	$.fancybox.showLoading();
        	
            var name = jQuery('#name').val();
            var description = jQuery('#description').val();
            var latitude = jQuery('#latitude').val();    
            var longitude = jQuery('#longitude').val();    
            var altitude = jQuery('#altitude').val();    
            var sid = jQuery('#sid').val();  
            var poi_id = jQuery('#poi_id').val();  
                
            var  info = [];
            info[0] = name;
            info[1] = description;
            info[2] = latitude;
            info[3] = longitude;
            info[4] = sid;
            info[5] = poi_id;
            info[6] = altitude;
           
           
            var obj_data = {};
            //http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
            $.each($('form .ConfigSave').serializeArray(), function(i, field) {
                obj_data[field.name] = field.value;
            });           
            console.log(obj_data);            
            
            $.ajax({
                  dataType: "text",
                  method: "POST",
                  url: "ajax/ajax_save_poi.php",
                  data: {info:info, obj_data: obj_data}
            })
              .done(function( msg ) {
                  //alert( "Data Saved: " + msg );
                    alert('Eintrag wurde gespeichert.');
                    location.href='index.php?p=szenario&sid='+sid;
              
              });
              
            });                
            
    
    //-------------------------             
    jQuery('.delete_button').click(function() {

$.fancybox.showLoading();
    var poi_id = jQuery(this).attr('poi_id');  
      
    //  alert(poi_id); 
       
    var  info = [];
    info[0] = poi_id;
    
  //  alert(JSON.stringify(info));
    
    $.ajax({
          dataType: "text",
          method: "POST",
          url: "ajax/ajax_del_poi.php",
          data: {info:info}
    })
      .done(function( msg ) {
         //	alert( "Data Saved: " + msg );
            alert('Eintrag wurde gelöscht.');
            location.reload();
      
      });
});                     




$('#openMap').click(
    
    function(){
        $.fancybox(
            $('#mapBoxopen')
        );
    initialize();
    }
);

$('#coordinates_ok').click(
    
    function(){
      $('#latitude').val($('#latitude_temp').val());
      $('#longitude').val($('#longitude_temp').val());  
       $('#altitude').val($('#altitude_temp').val()); 
      $.fancybox.close();
    }
);


$("#icon").addClass($('#icon_poi').val());   
   
   $( "#icon_poi" ).on('change focusout click focusin keypress keyup', function() {
			
		$("#icon").removeClass();
		$("#icon").addClass($(this).val());       


    });

// ------------------------------------------------------------------------------                    
// ------------------------------------------------------------------------------                     
}); // <--- End Document Ready
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
 





// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
 

// -------------Start DEL Szenario---------------------------------
// ------------------------------------------------------------------------------
$(document).ready(function () {


 $('#confirm_delete_szenario').click(function() {

$.fancybox.showLoading();
                        
                
                    var obj = new Object;
                        obj.sid           = $(this).attr('sid');
                           
                        $.ajax({
                              dataType: "text",
                              method: "POST",
                              url: "ajax/ajax_del_szenario.php",
                              data: {data: obj
                                  }
                        })
                          .done(function( msg ) {
                                //alert( "Data Saved: " + msg );
                                //var obj = jQuery.parseJSON( msg );
                                //var sid = obj.sid;
                                location.href='index.php';
                           });
        
    });

// ------------------------------------------------------------------------------                    
// ------------------------------------------------------------------------------                     
}); // <--- End Document Ready
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
 

// -------------Extern Source Szenario---------------------------------
// ------------------------------------------------------------------------------
$(document).ready(function () {
    

        $('#save_extern_ressource').click(function () { ajax_save_extern_source($(this)); });


        function ajax_save_extern_source(e){
            $.fancybox.showLoading();
                     var obj = new Object;
                         obj.sid        = $('#save_extern_ressource').attr('sid');
                         obj.url        = $('#ar_new_extern_source').val();
                  
                           
                        $.ajax({
                              dataType: "text",
                              method: "POST",
                              url: "ajax/ajax_edit_ar_extern_source.php",
                              data: {data: obj
                                  }
                        })
                          .done(function( msg ) {
                              // alert( "Data Saved: " + msg );
                                var obj = jQuery.parseJSON( msg );
                                var sid = obj.sid;
                                location.href='index.php?p=szenario&sid='+sid;
                           });
            
        };


$('.url_div_link').click(function () {  ajax_del_extern_source($(this)); });


        function ajax_del_extern_source(e){
          $.fancybox.showLoading();
              var obj = new Object;
                        obj.urlid       = e.attr('urlid');
                         obj.sid        = e.attr('sid');
                         obj.url        = $('#ar_new_extern_source').val();
            
             $.ajax({
                              dataType: "text",
                              method: "POST",
                              url: "ajax/ajax_del_url.php",
                              data: {data: obj
                              }
                        })
                          .done(function( msg ) {
                              // alert( "Data Saved: " + msg );
                                var obj = jQuery.parseJSON( msg );
                                var sid = obj.sid;
                                location.href='index.php?p=szenario&sid='+sid;
                           });
        };


// ------------------------------------------------------------------------------                    
// ------------------------------------------------------------------------------                     
}); // <--- End Document Ready
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------


//Download Link for QR-Code
$(document).ready(function () {
    $('#fake-link-qr').click(function(){
        this.href = document.getElementById('qrcode').firstElementChild.toDataURL();
        this.download = "qr_code.png";
    });
});
 