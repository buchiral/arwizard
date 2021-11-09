<?php

$sid = $_REQUEST['sid'];
$sql = "SELECT * FROM ar_szenario WHERE id = ".$sid." ";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
while($row = mysqli_fetch_assoc($result)) {
	$name = $row['name'];
    echo $row['name'];
	$description = $row['description'];
	$credat = $row['credat'];	
	}
} 

		$path = $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
		$url = "http://".$path."/webapp/?sid=".$sid; // Ausgabe: name	

?>
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
					<h1 class="page-header"><i class="fa fa-briefcase fa-fw"></i> <?php echo $name; ?></h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            
            
         <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          <i class="fa fa-briefcase fa-fw"></i> Szenario #<?php echo $sid; ?>
                           <div class="pull-right">
                           		<a href="index.php?p=edit_szenario&sid=<?php echo $sid; ?>">
                           			<button class="btn btn-primary btn-xs"><i class="fa fa-pencil fa-fw"></i>config</button>
                       			</a>
                           		<button data-toggle="modal" data-target="#szenario_del_box" class="btn btn-danger btn-xs"><i class="fa fa-trash-o fa-fw"></i> delete</button>

                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                                           			<table>
                  				     	<tr>
                  				     	
                  				     	 	<td width="100%">
                  				     	 		<b><span style="width:120px;display:inline-block">Name:</span></b> <?php echo $name; ?> <br>
                  				     	 		<b><span style="width:120px;display:inline-block">Creation-Date:</span></b> <?php echo $credat; ?> <br><br>
                  				     	 		<b>Description:</b> <br> <?php echo $description; ?> <br><br>
                  				     	 		<div>Link to AR-Szenario: <a target="_blank" href="<?php echo $url; ?>"> <?php echo $url; ?> </a></div>
                                            </td> 
                                            <td><div  id="qrcode" QRurl="<?php echo $url ?>"></div> <a id="fake-link-qr"  class="fake-link-qr">Download</a></td>
                                        </tr>
                  				
                  			</table>
                  			
                        </div>
                        <!-- /.panel-body -->
                    </div><!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->

            
            
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                           <i class="fa fa-image fa-fw"></i> Point of Interest
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="dataTable_wrapper">
                                <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   <?php
                                   
                                   
                                   $table_inhalt= "";
								   
                                   $sql = "SELECT * FROM ar_poi WHERE ar_szenario_fkid = ".$sid." ";
										$result = mysqli_query($conn, $sql);
										
										if (mysqli_num_rows($result) > 0) {
										    // output data of each row
										    while($row = mysqli_fetch_assoc($result)) {	
												
												
												$edit_url = '<a href="index.php?p=edit&poi='.$row['id'].'&sid='.$sid.'" > <button class="btn btn-primary btn-xs" >Edit</button> </a>';
												$edit_url = '<a href="index.php?p=edit&poi='.$row['id'].'&sid='.$sid.'" > <button title="Edit" class="btn btn-primary btn-xs" ><i class="fa fa-pencil fa-fw"></i> edit</button> </a>';
											
												//$del_url = ' <button poi_id="'.$row['id'].'" class="btn btn-primary btn-xs delete_button">Löschen</button> ';
												$del_url = '<button poi_id="'.$row['id'].'" class="btn btn-danger btn-xs delete_button"><i class="fa fa-trash-o fa-fw"></i></button> ';
												
												  $table_inhalt .= '<tr>';
												  $table_inhalt .= '<td>' .$row['id'] . '</td>';
												  $table_inhalt .= '<td>' .$row['name'] . '</td>';
												  $table_inhalt .= '<td>' .$row['latitude'] . '</td>';
												  $table_inhalt .= '<td>' .$row['longitude'] . '</td>';
												  $table_inhalt .= '<td>' .$edit_url.$del_url .'</td>';
												  $table_inhalt .= '</tr>';
										    }
										} else {
										    echo "0 results";
										}
										
										echo $table_inhalt;
							?>
                                   
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.table-responsive -->
                            <div class="well">
                                
                                <a class="btn btn-primary btn-xs "  href="index.php?p=edit&sid=<?php echo $sid; ?>"><i class="fa fa-image fa-fw"></i> Add new POI</a>
                            </div>
                        </div>
                        <!-- /.panel-body -->
                    </div><!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                           <i class="fa fa-external-link fa-fw"></i> Extern Source with POI
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
							
                            <div id="externList">
                            	<?php
                                   
                                   
                                   $table_inhalt= "";
								  
								  
								  	$oldURL = $database->get("ar_szenario"	, "extern_poi_url"	, array(	'id' 				=> $sid));
									$oldURL = json_decode($oldURL,true); // ein Array
								  
								  
								for ($i = 0; $i < count($oldURL); $i++) {
									
									$iii = $i +1;
										    $table_inhalt = $table_inhalt . '<div class="url_div" >'.$iii.'. '. $oldURL[$i].' <button urlid="'.$i.'" title="Delete"  class="url_div_link btn btn-danger btn-xs" sid="'. $sid.'" href="#"> <i class="fa fa-trash-o fa-fw"></i> </button></div>';
										};								   
									 
										echo $table_inhalt;
							?>
							<p></p>
                            </div>
                            



                            <div class="well">
                              <a class="btn btn-primary btn-xs " data-toggle="modal" data-target="#szenario_source_add" href="#"><i class="fa fa-external-link fa-fw"></i> Add Source</a> Do you want to include an extern Source with POI?! Put your url from the json subject here... 
                                
                            </div>
                            
                            

                            
                            
                        </div>
                        <!-- /.panel-body -->
                    </div><!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        </div>
        <!-- /#page-wrapper -->
        
        


<div id="szenario_del_box" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Delete AR-Szenario</h4>
      </div>
      <div class="modal-body">
       		Möchten dieses AR-Szenario löschen?												
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" sid="<?php echo $sid; ?>" class="btn btn-primary" id="confirm_delete_szenario">Delete</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->






<div id="szenario_source_add" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Extern Source</h4>
      </div>
      <div class="modal-body">
			<div class="form-group">
			<label>URL</label>
			<input type="text" placeholder="JSON-URL with POI" class="form-control" id="ar_new_extern_source" value="">
			</div>											
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" sid="<?php echo $sid; ?>" class="btn btn-primary" id="save_extern_ressource">Save</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


















<!--
	
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li data-toggle="modal" data-target="#szenario_del_box">
                                        	<a href="#"><i class="fa fa-trash-o fa-fw"></i> Löschen</a>
                                        </li>
                                        <li><a href="index.php?p=edit_szenario&sid=<?php echo $sid; ?>"><i class="fa fa-pencil fa-fw"></i> Konfigurieren</a>
                                        </li>
                                    </ul>
                                </div>

-->