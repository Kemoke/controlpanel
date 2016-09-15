<?php
/**
 * Created by IntelliJ IDEA.
 * User: Kemal
 * Date: 13.09.2016.
 * Time: 21:54
 */

namespace App;


use Illuminate\Http\Request;
use Ssh\Exec;
use Ssh\Sftp;

/**
 * Class SSH
 * @property \Ssh\Exec $exec
 * @property \Ssh\Sftp $sftp
 * @property string $dir
 */
class SSH{
    public function __construct($exec, $sftp, $dir)
    {
        $this->exec = $exec;
        $this->sftp = $sftp;
        $this->dir = $dir;
    }
    public static function init(Request $request){
        $srvid = $request->input('id');
        $server = Server::find($srvid);
        $username = $server->username;
        $password = $server->password;
        $hostname = $server->hostname;
        $dir = $server->rootdir . $request->input('path', '/');
        $config = new \Ssh\Configuration($hostname);
        $auth = new \Ssh\Authentication\Password($username, $password);
        $session = new \Ssh\Session($config, $auth);
        return new SSH($session->getExec(), $session->getSftp(), $dir);
    }
}