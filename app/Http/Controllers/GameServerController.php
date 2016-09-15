<?php

namespace App\Http\Controllers;

use App\Server;
use App\SSH;
use Illuminate\Http\Request;

use App\Http\Requests;
use xPaw\SourceQuery\SourceQuery;

class GameServerController extends Controller
{
    public function query(Request $request)
    {
        $id = $request->input('id');
        $server = Server::find($id);
        $ip = 'srv.kemoke.net';
        $port = '27015';
        $query = new SourceQuery();
        try{
            $query->Connect($ip, $port, 5, SourceQuery::SOURCE);
            return response()->json($query->GetInfo());
        } catch (\Exception $e){
            return response()->make($e->getMessage(), 500);
        } finally {
            $query->Disconnect();
        }
    }

    public function start(Request $request)
    {
        $ssh = SSH::init($request);
        try{
            try{
                $ssh->exec->run('screen -S cwsrw -X quit');
            } catch (\RuntimeException $e){
                //
            }
            $msg = $ssh->exec->run($ssh->dir."start.sh");
            return $msg;
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }

    public function stop(Request $request)
    {
        $ssh = SSH::init($request);
        try{
            $output = $ssh->exec->run('screen -S cwsrw -X quit');
            return $output;
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }
}
