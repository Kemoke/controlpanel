<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Server
 *
 * @mixin \Eloquent
 * @property integer $id
 * @property string $name
 * @property string $hostname
 * @property string $username
 * @property string $password
 * @property string $rootdir
 * @property string $startcmd
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereHostname($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereUsername($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereRootdir($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereStartcmd($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Server whereUpdatedAt($value)
 */
class Server extends Model
{
    //
}
