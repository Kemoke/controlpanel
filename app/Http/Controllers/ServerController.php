<?php

namespace App\Http\Controllers;

use App\Server;
use Illuminate\Http\Request;

use App\Http\Requests;

class ServerController extends Controller
{
    public function index(Request $request)
    {
        $servers = Server::get();
        return response()->json($servers);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        $server = new Server();
        foreach ($inputs as $key => $val){
            $server->{$key} = $val;
        }
        $server->save();
        return response()->json($server);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Server::find($id));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $server = Server::find($id);
        $inputs = $request->all();
        foreach ($inputs as $key => $val){
            $server->{$key} = $val;
        }
        $server->save();
        return response()->json($server);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Server::destroy($id);
        return response()->make('done');
    }
}
