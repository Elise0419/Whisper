<?php
namespace App\Services\V1;

use Illuminate\Http\Request;

class ComtxtQuery
{
//not trust user input so make a safe filed
    protected $safeParms = [ //fillable
        'id' => ['eq'],
        'postId' => ['eq'],
        'userId' => ['eq'],

    ];
    protected $columnMap = [
        'postId' => 'post_id',
        'userId' => 'user_id',

    ];
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',

    ];
    public function transform(Request $request)
    {
        $eloQuery = [];

        foreach ($this->safeParms as $parm => $operators) {
            $query = $request->query($parm);
            if (!isset($query)) {
                continue;
            }
            $column = $this->columnMap[$parm] ?? $parm;
            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                }
            }

        }

        return $eloQuery;
    }

}
