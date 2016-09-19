<?php
header("Content-type:text/html;charset=utf-8");
//定义数据库连接信息常量
define('DB_HOST', "localhost");
define('DB_USER', "root");
define('DB_PWD', "");
define('DB_NAME', 'avrdb');


//数据库连接
global $conn;
function connect(){
	$conn = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_NAME);
	if (mysqli_connect_errno()) {
        echo "数据库连接错误: " . mysqli_connect_error();
    }
    return $conn;
}

//数据库处理
class DBHandle{
	public $conn;
	function __construct(){
		$this->conn = connect();
	}

	public function getNewsList($page, $pagesize){
		// $sql = "SELECT * FROM news";
		$sql = "select * from news ORDER BY `id` DESC limit " . ($page-1)*$pagesize . ",". $pagesize;
		$rs = $this->conn->query($sql);
		$news = $rs->fetch_all(MYSQLI_ASSOC);
		return $news;
	}

	public function getNews($id){
		$sql = "SELECT * FROM news WHERE `id`='$id'";
		$rs = $this->conn->query($sql);
		$news = $rs->fetch_array(MYSQLI_ASSOC);
		return $news;
	}

	public function createNews($news){
		$sql = "insert into news(title, description, keyword, source, featured_img, author, content) VALUES('$news[title]','$news[description]','$news[keyword]','$news[source]','$news[featured_img]','$news[author]','$news[content]')";
		$rs = $this->conn->query($sql);
		$last_newsid = $this->conn->insert_id;
		if(!empty($last_newsid)){
			return $last_newsid;
		}else{
			return ;
		}
	}

	public function randomNews($num){
		$sql = "SELECT * FROM `news` WHERE id >= (SELECT FLOOR( MAX(id) * RAND()) FROM `news` ) ORDER BY id LIMIT " . $num;
		$rs = $this->conn->query($sql);
		$news = $rs->fetch_all(MYSQLI_ASSOC);
		return $news;
	}

	public function search($keyword){
		$sql = "SELECT * FROM news WHERE title LIKE '%".$keyword."%'";
		$rs = $this->conn->query($sql);
		$news = $rs->fetch_all(MYSQLI_ASSOC);
		return $news;
	}
}
