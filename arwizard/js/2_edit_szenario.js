
/*-----------------------------------------------------------
 *  Edit Szenario Javascript
 * -----------------------------------------------------------
 */ 
 
/*-----------------------------------------------------------
 *  Start Step Navigation
 * -----------------------------------------------------------
 */ 
$(document).ready(function () {

  var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');
          allBackBtn = $('.backBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
              $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
      }

      if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
  });
  

  $('div.setup-panel div a.btn-primary').trigger('click');
/*-----------------------------------------------------------
 *  End Step Navigation
 * -----------------------------------------------------------
 */ 

// Save AR-Szenario 
  $(document).ready(function () {          
                        
        $('#ar_szenario_save').click(function () { ajax_save_ar_szenario(); });
        
        function ajax_save_ar_szenario(){
                     $.fancybox.showLoading();
                       var form_data_array = {};
                        //-http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
                        $.each($('form .ConfigSave').serializeArray(), function(i, field) {
                            form_data_array[field.name] = field.value;
                        });
        
                        var data_obj = new Object;
                         data_obj.ar_name           = jQuery('#ar_name').val();
                         data_obj.ar_description    = jQuery('#ar_description').val();
                         data_obj.id                = jQuery('#form1').attr('sid');
                           
                        $.ajax({
                                  dataType: "text",
                                  method: "POST",
                                  url: "ajax/ajax_edit_ar_szenario.php",
                                  data: {data       : data_obj,
                                         form_data  : form_data_array}
                        
                        }).done(function( msg ) {
                                //alert( "Data Saved: " + msg );
                                var obj = jQuery.parseJSON( msg );
                                var sid = obj.sid;
                                location.href='index.php?p=szenario&sid='+sid;
                          });
         }; 
 
 });


// Event-Handler 
$(document).ready(function () {
   
   $( ":input" ).on('change focusout click focusin', function() {
       drawLiveView();
    });

   $( ".slider" ).on('change focusout click focusin', function() {
       drawLiveView();
    });

   
   
     
     
    drawLiveView();
});





// ------------------------------------------------------------------------------                    
// ------------------------------------------------------------------------------                     
}); // <--- End Document Ready
function drawPOIBox(){
	
	var op = arwizard.szenario.config;

    $('.poi').css({
    	'width': 'auto',
  		'position': 'absolute',
  		'top': '30%',
  		'left': '45%',
    	'padding': '10px',
        "border-color": op.box_border_color,
        "border-width": op.box_border_width + 'px',
        "border-style": "solid",
        "border-top-left-radius": op.box_border_round_topleft + 'px',
        "border-top-right-radius": op.box_border_round_topright + 'px',
        "border-bottom-right-radius": op.box_border_round_bottomleft + 'px',
        "border-bottom-left-radius": op.box_border_round_bottomright + 'px',
        "background": op.box_bg_color,
        "opacity": op.box_opacity,
        'font-size': '11px',
        "color" : op.box_text_color
    });
    $('.poi2').css({
    	'position': 'absolute',
  			'top': '40%%',
  		'left': '20%%',
    	
    });	
};



function drawLiveView(){
           
           var values1 = {};
            //http://stackoverflow.com/questions/169506/obtain-form-input-fields-using-jquery
            
            $.each($('form').serializeArray(), function(i, field) {
               // console.log(field);
                values1[field.name] = field.value;
            });
           var array1 = {config : values1};
           var array2 = {szenario: array1  };
           arwizard.szenario = array1;
           
           
           arwizard.navigation = {status:false};
           
           
           drawRadar();
           
           if(  arwizard.szenario.config.radar_option == 'show'){
           			$('#svg_radar').show();
           } else {
           			$('#svg_radar').hide();
           };
           
           
           
           drawPOIBox();
           
           drawButtonOverlayer();
           
           // verschieben ins Live bild
          $('#svg_radar').css({'position' : 'absolute'});
          
          $('#buttonContainer').css({'position' : 'absolute', 'fontSize':'10px'});
          $('#listButton, #cameraButton, #mapButton, #radiusButton').css({'fontSize':'20px'});
         
};


$(document).ready(function() {
        slide_init();
        function slide_init() {
            
            $(".slider").slider({
                value: 0,
                min: 0,
                max: 15,
                step: 1,
                slide: function(event, ui) {

                    $(this).next().children('.input_slider').val(ui.value);
                drawLiveView();
                }
            });

            $(".radiusSlider").slider({
                value: 100,
                min: 0,
                max: 200,
                step: 1,
                slide: function(event, ui) {

                    $(this).next().children('.input_slider').val(ui.value);
                drawLiveView();
                }
            });


            $(".0t1").slider({
                value: 0.5,
                min: 0,
                max: 1,
                step: 0.1,

                slide: function(event, ui) {
                    
                    $(this).next().children('.input_slider').val(ui.value);
                    drawLiveView();
                }

            });


            $(".border_all").slider({
                value: 0,
                min: 0,
                max: 15,
                step: 1,

                slide: function(event, ui) {
                    $(this).next().children('.input_slider').val(ui.value);

                    $('#box_border_round_bottomright').slider('value', ui.value);
                    $('#box_border_round_bottomleft').slider('value', ui.value);
                    $('#box_border_round_topleft').slider('value', ui.value);
                    $('#box_border_round_topright').slider('value', ui.value);

                    $('#box_border_round_bottomright').next().children('.input_slider').val(ui.value);
                    $('#box_border_round_bottomleft').next().children('.input_slider').val(ui.value);
                    $('#box_border_round_topleft').next().children('.input_slider').val(ui.value);
                    $('#box_border_round_topright').next().children('.input_slider').val(ui.value);
                    
                    drawLiveView();
                }

            });

		if (typeof allinfo_obj === 'undefined') {
					} else {
		  fillForm();
		 };


}; // End Slideinit


$(function() {
	
    $('.cp-full').colorpicker({
        parts: 'full',
        showOn: 'both',
        buttonColorize: true,
        showNoneButton: true,
        alpha: true,
        colorFormat: 'RGBA'
    });
});


function setVale(fieldname) {
    var val = '';
    if (allinfo_obj.config) {
        if (allinfo_obj.config[fieldname]) {
            val = allinfo_obj.config[fieldname];
        };
    };
    return val;
};

function fillForm(){
	
	var $inputs = $('#form1 .ConfigSave');
		$inputs.each(function() {
			
			var value = setVale(this.name);
				$(this).val(value);
				
				if ($(this).hasClass('input_slider')) {
				
				    $(this).parent().parent().children('.slider').first().slider('value',value);
				        
				};
		});
};


}); // End ready