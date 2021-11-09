  <?php
  
  $sql = "SELECT * FROM ar_szenario";
$result = mysqli_query($conn, $sql);
$anzahl_szenarios = mysqli_num_rows($result);


//echo $_SERVER['HTTP_REFERER'];

//get the szenarios with QR
$szena = '';
while($row = mysqli_fetch_assoc($result)) {
		
	


	
		$path = $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
		$url = "http://".$path."/webapp/?sid=".$row['id']; // Ausgabe: name	

       $szena .=' <div class="col-lg-4" style="width: 250px;  float: left;">
                    <div class="panel panel-success">
                        <div class="panel-heading">
                           <b> '.$row['name'].' </b>
                        </div>
                        <div class="panel-body" style="text-align: center">
                           <div class="qrcode01" id="qrcode01" QRurl="'.$url.'"></div>
                        </div>
                        <div class="panel-footer">
                           <a href="index.php?p=szenario&sid='.$row['id'].'"><i class="glyphicon glyphicon-eye-open"></i> View</a>
                        </div>
                    </div>
                </div>
';
} // end whilw


?>
  
  
          <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row ------------------------------------------------------------------------------------------------->
            
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-briefcase fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"><?php echo $anzahl_szenarios; ?></div>
                                    <div>Szenarios</div>
                                </div>
                            </div>
                        </div>
                        <a href="index.php?p=edit_szenario">
                            <div class="panel-footer">
                                <span class="pull-left">Neues Szenario erstellen</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    
                </div>
                  <div style="display: none" class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-image fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"><?php echo $anzahl_szenarios; ?></div>
                                    <div>Point of Interest</div>
                                </div>
                            </div>
                        </div>
                        <a href="index.php?p=add_szenario">
                            <div class="panel-footer">
                                <span class="pull-left">Alle POI</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                    
                </div>
            </div>
            <!-- /.row --------------------------------------------------------------------------------------------------->
            
            
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Vorhandene AR-Szenarios
                        </div>
                        <div class="panel-body">
                            
                
				<?php echo $szena; ?>		
						
						</div>

                    </div>
                </div>
                <!-- /.col-lg-4 -->
            </div>            
            <!-- /.row --------------------------------------------------------------------------------------------------->            
            
            
            
            
            
            
            
        </div>
        <!-- /#page-wrapper -->
