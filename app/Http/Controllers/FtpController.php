<?php

namespace App\Http\Controllers;

use App\FtpFile;
use App\SSH;
use Illuminate\Http\Request;

class FtpController extends Controller
{
    public function listDir(Request $request)
    {
        $ssh = SSH::init($request);
        try{
            $data = $ssh->exec->run('ls -lh --group-directories-first '.$ssh->dir);
            strtok($data, "\r\n");
            $line = strtok("\r\n");
            $lines = [];
            $dirs = [];
            $id = 0;
            while($line !== false){
                array_push($lines, $line);
                $line = strtok("\r\n");
            }
            foreach ($lines as $line){
                $temp = strtok($line, " ");
                $dir = false;
                if($temp[0] == "d"){
                    $dir = true;
                }
                $file = new class{};
                $file->id = $id++;
                $file->dir = $dir;
                $file->perms = $temp;
                strtok(" ");
                $temp = strtok(" ");
                $file->owner = $temp;
                $temp = strtok(" ");
                $file->group = $temp;
                $temp = strtok(" ");
                $file->size = $temp;
                $date = strtok(" ") . " " . strtok(" ") . " " . strtok(" ");
                $file->edited = $date;
                $temp = strtok(" ");
                $file->name = $temp;
                array_push($dirs, $file);
            }
            return response()->json($dirs);
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }

    public function openFile(Request $request)
    {
        $ssh = SSH::init($request);
        $pos = strrpos($ssh->dir, '/');
        $filename = $pos === false ? $pos : substr($ssh->dir, $pos + 1);
        try{
            $data = $ssh->sftp->read($ssh->dir);
            $file = new class{};
            $file->name = $filename;
            $file->content = $data;
            return response()->json($file);
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }

    public function deleteFile(Request $request)
    {
        $ssh = SSH::init($request);
        try{
            $ssh->sftp->rmdir($ssh->dir);
            return response()->make('done');
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }

    public function editFile(Request $request)
    {
        $ssh = SSH::init($request);
        $data = $request->input('content');
        try{
            $ssh->sftp->write($ssh->dir, $data);
            return response()->make('done');
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }

    public function uploadFile(Request $request)
    {
        $file = $request->file('file');
        $newfile = $file->move('/uploads', 'temp');
        $fname = '/uploads/temp';
        $filehndl = fopen($fname, 'r+b');
        $data = fread($filehndl, filesize($fname));
        $ssh = SSH::init($request);
        try{
            $ssh->sftp->write($ssh->dir.'/'.$file->getClientOriginalName(), $data);
            fclose($filehndl);
            unlink($newfile->getPath() . '/temp');
            return response()->make('done');
        } catch (\RuntimeException $e){
            return response()->make($e->getMessage(), 500);
        }
    }
}
