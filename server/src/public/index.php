<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../../vendor/autoload.php';
require '../common.php';
require '../db.php';

$app = new \Slim\App;

$app->get('/test', function($request, $response, $args){
	return $response->write("Hello, Slim!");
});

$app->get('/hello/{name}', function($request, $response, $args){
	return $response->write("Hello, ". $args['name']);
});

//////////////////////////////////////////////////////////////////

$app->get('/news', function($request, $response, $args){
	$db = new DBHandle();
	$page = $request->getQueryParam('page', $default = 1);
	$pagesize = $request->getQueryParam('pagesize', $default = 2);
	$news = $db->getNewsList($page, $pagesize);
	if(count($news)){
		return $response->withJson(formatOutput(true, $news, '请求成功'));
	}else{
		return $response->withJson(formatOutput(false, $news, '请求成功'));
	}
});

$app->get('/news/{id}', function($request, $response, $args){
	$id = $request->getAttribute('id');
	$db = new DBHandle();
	$news = $db->getNews($id);
	if($news){
		return $response->withJson(formatOutput(true, $news, '请求成功'));
	}else{
		return $response->withJson(formatOutput(false, $news, '请求成功'));
	}	
});

$app->post('/news', function($request, $response, $args){
	$body = $request->getParsedBody();
	$db = new DBHandle();
	$status = $db->createNews($body);
	if($status){
		return $response->withJson(formatOutput(true, $status, '新闻添加成功'));
	}else{
		return $response->withJson(formatOutput(false, $status, '新闻添加失败'));
	}
});

$app->get('/random/{num}', function($request, $response, $args){
	$num = $request->getAttribute('num');
	$db = new DBHandle();
	$news = $db->randomNews($num);
	if(count($news)){
		return $response->withJson(formatOutput(true, $news, '请求成功'));
	}else{
		return $response->withJson(formatOutput(false, $news, '请求成功'));
	}
});

$app->get('/search', function($request, $response, $args){
	$db = new DBHandle();
	$keyword = $request->getQueryParam('s', $default = '');
	$news = $db->search($keyword);
	if(count($news)){
		return $response->withJson(formatOutput(true, $news, '请求成功'));
	}else{
		return $response->withJson(formatOutput(false, $news, '请求成功'));
	}
});

$app->run();