<?php
$name        = '';
$description = '';
$latitude    = '';
$longitude   = '';
$altitude = '';
$img_url     = '';
$video_url   = '';
$audio_autoplay   = '';
$audio_url   = '';
$icon = '';


$sid = $_REQUEST['sid'];

if (isset($_REQUEST['poi'])) {
    $poi_id = $_REQUEST['poi'];
} else {
    $poi_id = -50;
}
;

$sql    = "SELECT * FROM ar_poi WHERE id = " . $poi_id . " ";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) { // output data of each row 
    
    while ($row = mysqli_fetch_assoc($result)) {
        
        $name        = $row['name'];
        $description = $row['description'];
        $latitude    = $row['latitude'];
		$longitude   = $row['longitude'];
		$altitude   = $row['altitude'];
       	$config1     = $row['poi_info'];
    }
    $config    = json_decode($config1, TRUE);
    $img_url   = $config['img_url'];
    $video_url = $config['video_url'];
    $audio_autoplay = $config['audio_autoplay'];
    $audio_url = $config['audio_url'];
    $icon = $config['icon_poi'];
} else {
    //echo "0 results"; 
};


$data = $database->get("ar_szenario"    , "*"   , array(    'id'                => $sid));

?>



<div id="page-wrapper">
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><i class="fa fa-image fa-fw"></i> Point-of-Interest</h1>
            <b>AR-Szenario-ID:</b> <?php echo $data['id']; ?><br>
            <b>AR-Szenario-Name:</b> <?php echo utf8_decode($data['name']); ?> 
            <br><br>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- /.row -->
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <i class="fa fa-image fa-fw"></i> Edit POI
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <form id "form1" role="form">
                                <div class="form-group">
                                    <label>POI-Name</label>
                                    <input class="form-control" name="name" id="name" placeholder="Der Name vom POI" value="<?php echo $name; ?>">

                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <textarea id="description" name="description" placeholder="Description" class="form-control" rows="3"><?php echo $description; ?></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label>Icon-POI</label>
                                    <div>
                                        <div style="float:left">
                                        <input class="form-control ConfigSave" style="width: 240px" name="icon_poi" id="icon_poi" placeholder="Icon description: fa fa-anchor" value="<?php echo $icon; ?>">
                                    </div>
                                        <div><div id="icon1"> <i style="font-size: 20px;padding-left: 5px;height: 34px;  padding-top: 5px;" id="icon"> </i></div>
                                        </div>
                                        <div style="clear: both">- You can input a class-Name vom <a href="http://fortawesome.github.io/Font-Awesome/icons/" >FontAwesomeIcons</a> or from <a href="http://ionicons.com/">Ionicons.com</a> </div>
                                    </div>
                                </div>                               
                                <br>
                                
                                <div style="display:none" class="form-group">
                                    <label>POI Type</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="">Text
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Audio
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">Video
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" name="optionsRadios" id="optionsRadios3" value="option4">Bild
                                        </label>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label>Coordinates</label>
                                    <div id="panel">
                                        <input id="latitude" placeholder="Latitude" name="latitude" value="<?php echo $latitude; ?>" type="textbox">
                                        <input value="<?php echo $longitude; ?>" placeholder="Longitude" id="longitude" name="longitude" type="textbox">
                                        <input value="<?php echo $altitude; ?>" placeholder="Altitude" id="altitude" name="altitude" type="textbox">
                                        <br>
                                        <p></p>
                                        <input type="button" id="openMap" value="From Map">
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label>Video-URL</label>
                                    <input class="form-control ConfigSave" id="video_url" name="video_url" value="<?php echo $video_url; ?>">
                                    <p class="help-block">The URL from a Video:http://www.youtube.com/embed/XsaRuCIrzjs</p>
                                </div>

                                <div class="form-group">
                                    <label>Image-URL</label>
                                    <input class="form-control ConfigSave" id="img_url" name="img_url" value="<?php echo $img_url; ?>">
                                    <p class="help-block">The URL from a Image: http://www.alt-zueri.ch/turicum/strassen/p/paradeplatz/paradeplatz_anfang_20jh.jpg</p>
                                </div>
                                <div class="form-group">
                                    <label>Audio-URL</label>
                                    <input class="form-control ConfigSave" id="audio_url" name="audio_url" value="<?php echo $audio_url; ?>">
                                    <p class="help-block">The URL from a Audio: http://www.buchiral.ch/pruzhina_electro.mp3</p>
                                </div>
                                <div class="form-group">
                                     <label>Audio-Autoplay</label>
                                   <select class="form-control ConfigSave" id="audio_autoplay" name="audio_autoplay" >
                                                <option><?php echo $audio_autoplay === 'true'? 'true': 'false';  ?></option>
                                                <option><?php echo $audio_autoplay === 'true'? 'false': 'true'; ?></option>
                                   </select>
                                 </div>

<br><br>

                                <input id="sid" style="display: none" value="<?php echo $sid; ?>">
                                <input id="poi_id" style="display: none" value="<?php echo $poi_id; ?>">
                                <button type="button" id="save_poi" class="btn btn-primary">Save and Back</button>
                                <button type="reset" class="btn btn-default">Reset</button>
                            </form>
                        </div>
                        <!-- /.col-lg-6 (nested) -->

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

<div id="mapBoxopen" style="display:none;">
    <div class="modal-header">
        <h4 class="modal-title">Search POI</h4>
    </div>
    <div class="modal-body">
        <div id="mapBox">
            <input type="button" value="Search" hidden onclick="codeAddress()">
            <input placeholder="Adress, Place.." class="form-control" id="addresss" type="textbox" value="">
            <br>
            <div id="map-canvas"></div>
            <br>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="coordinates_ok">OK</button>
        <input id="latitude_temp" disabled="true" name="latitude_temp" style="display:block" type="textbox">
        <input id="longitude_temp" disabled="true" name="longitude_temp" style="display:block" type="textbox">
    	<input id="altitude_temp" disabled="true" name="altitude_temp" style="display:block" type="textbox">
    </div>
</div>
<!-- /.modal -->