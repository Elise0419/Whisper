<?php
namespace App\Services\V1;

use Illuminate\Http\Request;

class AdQuery
{
//not trust user input so make a safe filed
    protected $safeParms = [ //fillable
        'id' => ['eq'],
        'type' => ['eq'],
        'imgUrl' => ['eq'],
        'webUrl' => ['eq'],

    ];
    protected $columnMap = [
        'imgUrl' => 'imgurl',
        'webUrl' => 'weburl',

    ];
    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=', //, in like

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
