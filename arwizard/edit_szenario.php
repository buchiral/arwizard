<?php 

include("demo_szenario.php");


if (isset($_REQUEST['sid'])){
// Edit AR-Szenario
	$page_title = 'Edit AR-Szenario';
	
	$arszenario_id = $_REQUEST['sid'];

	$data = $database->get("ar_szenario"	, "*"	, array(	'id' 				=> $arszenario_id));
	
	$ar_szenario_config = json_decode($data['config']); 	//There are DB-Field which are already Json-Strings
	$data['config'] = $ar_szenario_config;
	
	$ar_extern_poi_url = json_decode($data['extern_poi_url']); 	//There are DB-Field which are already Json-Strings
	$data['extern_poi_url'] = $ar_extern_poi_url;
	
	

} else {
// New AR-Szenario	
		$page_title = 'New AR-Szenario';
		
		$arszenario_id = -1;
		$data['id']		= 'NEW';
		$data['name']		= 'NEW';
		$data['description'] = 'NEW1';
		$data['config'] = $demo_config_ar_szenario;
	};
	
	
$json_string = 	json_encode($data);

?>

<script> 
    var allinfo_obj = '';
    var allinfo =  '<?php echo $json_string;  ?>';
    	allinfo_obj = JSON.parse(allinfo);
    	
$(document).ready(function() {
    var string = '<li style="display: block;" class="panel-red"><a class="active" href="#"><i class="fa fa-briefcase fa-fw"></i>Edit/Add Szenario</a></li>       ';
     $('#side-menu').append(string);
});   
</script>

<div id="page-wrapper"><div id="test"></div>

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><i class="fa fa-briefcase fa-fw"></i> <?php  echo $page_title;  ?></h1>
            <b>AR-Szenario-ID:</b> <?php echo $data['id']; ?><br>
            <b>AR-Szenario-Name:</b> <?php echo $data['name']; ?> 
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
        <div class="stepwizard col-md-offset-3">
            <div class="stepwizard-row setup-panel">
                <div class="stepwizard-step">
                    <a href="#step-1" type="button" class="btn btn-primary btn-circle">1</a>
                    <p>Step 1</p>
                </div>
                <div class="stepwizard-step">
                    <a href="#step-2" type="button" class="btn btn-default btn-circle" disabled="disabled">2</a>
                    <p>Step 2</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">

                </div>
                <div class="panel-body">

                    <div class="row">
                        <div class="col-lg-12">

                            <form id="form1" role="form" sid="<?php echo $arszenario_id; ?>">
                       <div class="setup-content" id="step-1">

					                    <div class="row">
					                        <div class="col-lg-6">
					
					                                    <div class="form-group">
					                                        <label>AR-Szenario-Name</label>
					                                        <input type="text" class="form-control" name="ar_name" id="ar_name" value="<?php echo $data['name']; ?>">
					                                    </div>
					                                    <div class="form-group">
					                                        <label>Beschreibung</label>
					                                        <textarea id="ar_description" name="ar_description" class="form-control" rows="3"><?php echo $data['description']; ?> </textarea>
					                                        
					                                    </div>
                                                        
                                                                <div class="form-group">
                                                                   <label class="layer_width" style="font-weight: bold">AR-Navigation-Mode</label>
                                                                    <select name="navigation_type" class="form-control select_new ConfigSave">
                                                                        <option value="no">No Navigation</option>
                                                                        <option value="all">All types allowed</option>
                                                                        <option value="BICYCLING">Bicycle</option>
                                                                        <option value="DRIVING">Driving</option>
                                                                        <option value="WALKING">Walking</option>
                                                                        <option value="TRANSIT">Public transport</option>

                                                                     </select>
																</div>

					                                </div>
											 </div>
											 
											 <div class="row">
					                        <div class="col-lg-12">
					                        						                                    <div class="pull-right">
					                                        <button type="button" class="btn btn-primary nextBtn">Next</button>
					                                    </div>
					                        </div></div>
											 
                                </div>





                                <div class="setup-content" id="step-2">
                                    <!-- dsfsdf-->

             <div class="row">
                        <div class="col-lg-6">
                        	<br><br>
                        	
			                            <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Radar</label>
                                            <select name="radar_option" class="form-control select_new ConfigSave">
                                                <option value="hide">Hide Radar</option>
                                                <option value="show">Show Radar</option>
                                            </select>
                                        </div>
                                    <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Radar Position</label>
                                            <select name="radar_position" class="form-control select_new ConfigSave">
                                                <option value="bottomright">Bottom-Right</option>
                                                <option value="bottomleft">Bottom-Left</option>
                                                <option value="topright">Top-Right</option>
                                                <option value="topleft">Top-left</option>
                                            </select>
                                        </div>
									<div>                                        
									<label style="font-weight: bold" class="layer_width">Radar Radius</label>
									<label class="radio-inline">
									<div class="slider radiusSlider"></div><div class="slider_input"><input  name="radar_radius" class="input_slider ConfigSave" type="text" value="0.5"></div>
									</label>
									</div>
									<br>
                                    <label>Radar-Style Circle (Grossefläche)</label>
                                    <br>

                                    <div>
                                        <label class="layer_width">Background-Color</label>
                                        <label class="radio-inline" >
                                            <input type="text" class="cp-full ConfigSave" name="radar_circle_bg_color" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" class="cp-full ConfigSave" name="radar_circle_border_color" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Width</label>
                                        <label class="radio-inline">
                                            <div class="slider"></div><div class="slider_input"><input name="radar_circle_border_width" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Opacity</label>
                                        <label class="radio-inline">
                                            <div class="slider 0t1"></div><div class="slider_input"><input  name="radar_circle_opacity" class="input_slider ConfigSave" type="text" value="0.5"></div>
                                        </label>
                                    </div>
                                    <br>
                                    <label>Radar-Style Fieldview (Dreieck)</label>
                                    <br>
                                    <div>
                                        <label class="layer_width">Background-Color</label>
                                        <label class="radio-inline ">
                                            <input type="text" name="radar_fieldview_bg_color" class="cp-full ConfigSave" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" name="radar_fieldview_border_color" class="cp-full ConfigSave" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Width</label>
                                        <label class="radio-inline">
                                            <div class="slider"></div><div class="slider_input"><input  name="radar_fieldview_border_width" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Opacity</label>
                                        <label class="radio-inline">
                                            <div class="slider 0t1"></div><div class="slider_input"><input  name="radar_fieldview_opacity" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>

                                    </div>
                                    <br>
                                    <label>Radar-North-Needle</label>
                                    <br>
                                    <div>
                                        <label class="layer_width">Background-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" name="radar_needle_bg_color" class="cp-full ConfigSave" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" name="radar_needle_border_color"  class="cp-full ConfigSave" value="186aa7" />
                                        </label>
                                                                                <br>
                                        <label class="layer_width">Border-Width</label>
                                        <label class="radio-inline">
                                            <div class="slider"></div><div class="slider_input"><input name="radar_needle_border_width" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>

                                    </div>
                                    <br>
                                    <br>

             </div>
 <div class="col-lg-6">
<br><br>

                                    <div class="form-group">
                                        <label>Pop-Up-Box-POI</label>
                                        <br>

                                    </div>

                                    <div>
                                        <label class="layer_width">Text-Color</label>
                                        <label class="radio-inline ">
                                            <input type="text" name="box_text_color" class="cp-full ConfigSave" value="186aa7" /> 
                                        </label>
                                        <br>
                                        
                                        <label class="layer_width">Box-Background-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" name="box_bg_color" class="cp-full ConfigSave" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Box-Opacity</label>
                                        <label class="radio-inline">
                                            <div class="slider 0t1"></div><div class="slider_input"><input  name="box_opacity" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Color</label>
                                        <label class="radio-inline">
                                            <input type="text" class="cp-full ConfigSave" name="box_border_color" value="186aa7" />
                                        </label>
                                        <br>
                                        <label class="layer_width">Broder-Width</label>
                                        <label class="radio-inline">
                                            <div class="slider"></div><div class="slider_input"><input name="box_border_width"  class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Rounding-All</label>
                                        <label class="radio-inline">
                                            <div class="slider border_all"></div><div class="slider_input"><input name="box_border_round_all" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Rounding-Top-Left</label>
                                        <label class="radio-inline">
                                            <div class="slider" id="box_border_round_topleft"></div><div class="slider_input"><input name="box_border_round_topleft" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Rounding-Top-Right</label>
                                        <label class="radio-inline">
                                            <div class="slider" id="box_border_round_topright"></div><div class="slider_input"><input name="box_border_round_topright" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Rounding-Bottom-Left</label>
                                        <label class="radio-inline">
                                            <div class="slider" id="box_border_round_bottomleft"></div><div class="slider_input"><input name="box_border_round_bottomleft" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>
                                        <br>
                                        <label class="layer_width">Border-Rounding-Bottom-Right</label>
                                        <label class="radio-inline">
                                            <div class="slider" id="box_border_round_bottomright"></div><div class="slider_input"><input name="box_border_round_bottomright" class="input_slider ConfigSave" type="text" value="10"></div>
                                        </label>

                                    </div>

                                    <br>
                                    <br>

                                    <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Radius-Mode</label>
                                            <select name="radius_option" class="form-control select_new ConfigSave">
                                                <option value="enable">Enable</option>
                                                <option value="disable">Disable</option>
                                            </select>
                                        </div> 

                                    <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Map-Mode</label>
                                            <select name="mapmodus" class="form-control select_new ConfigSave">
                                                <option value="enable">Enable </option>
                                                <option value="disable">Disable</option>

                                            </select>
                                        </div>

                                    <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Listmodus</label>
                                            <select name="listmodus" class="form-control select_new ConfigSave">
                                                <option value="enable">Enable </option>
                                                <option value="disable">Disable</option>

                                            </select>
                                        </div>


                                    <div class="form-group">
                                           <label class="layer_width" style="font-weight: bold">Pause-function</label>
                                            <select name="pause_function" class="form-control select_new ConfigSave">
                                                <option value="enable">Allowed</option>
                                                <option value="disable">No allowed</option>
                                            </select>
                                        </div>

              </div>
                </div>


                                  <div class="form-group">
                                        <label>Live View: </label>
                                        <div class="smartphone">
                                            <div class="smartphone_inner">
                                        	                <svg id="svg_radar" height="400" width="400">
											                    <path id="path_radar" />
											                    <path id="path_fieldview" />
											                    <path id="path_needle" />
											                </svg>
											                <div id="buttonContainer"></div>
                                        
                                        
                                        
                                                <div class="poi" >Paradeplatz<br> <i class="fa fa-location-arrow"></i>  129 m</div>
                                                <div class="poi poi2" >Bern<br> <i class="fa fa-location-arrow"></i>  60 km</div>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="pull-right">
                                        
                                        <button style="display: none" type="button" class="btn btn-primary nextBtn">Next</button>
                                        <button type="button" id="ar_szenario_save" class="btn btn-primary"><i class="fa fa-briefcase fa-fw"></i> AR-Szenario save</button>
                                    </div>


                                    <!-- dsfsdf-->
                                </div>
                                <!-- dsfsdf-->



                                <div class="setup-content" id="step-3">
                                    <div class="form-group">
                                        <label>Beschreibung</label>
                                        <textarea id="description" class="form-control" rows="3">Empty</textarea>
                                        <p class="help-block">Beschreibung vom POI</p>
                                    </div>
                                    <div class="pull-right">
                                        <button type="button" id="ar_szenario_save" class="btn btn-primary"><i class="fa fa-briefcase fa-fw"></i> AR-Szenario save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- /.col-lg-12 (nested) -->
                    </div>
                    <!-- /.row (nested) -->
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->

</div>

<!-- /#page-wrapper -->