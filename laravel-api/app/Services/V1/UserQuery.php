<?php
namespace App\Services\V1;

use Illuminate\Http\Request;

class UserQuery
{
//not trust user input so make a safe filed
    protected $safeParms = [ //fillable
        'userId' => ['eq'],
        'memName' => ['eq'],
        "personId" => ['eq'],
        "gender" => ['eq'],
        'email' => ['eq'],
        'password' => ['eq'],
        "headimg" => ['eq'],
        "phone" => ['eq'],
        //can use & not |
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

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    $eloQuery[] = [$parm, $this->operatorMap[$operator], $query[$operator]];
                }
            }

        }

        return $eloQuery;
    }

}
