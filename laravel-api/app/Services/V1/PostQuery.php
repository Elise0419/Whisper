<?php
namespace App\Services\V1;

use Illuminate\Http\Request;

class PostQuery
{
//not trust user input so make a safe filed
    protected $safeParms = [ //fillable
        'postId' => ['eq'],
        'userId' => ['eq'],
        'title' => ['eq'],
        'type' => ['eq'],
        'content' => ['eq'],
        'imgUrl' => ['eq'],
        'thumb' => ['eq', 'gt', 'lt'],
        'save' => ['eq', 'gt', 'lt'],
        'comTxt' => ['eq', 'gt', 'lt'],
        'tag' => ['eq'],
        'postTime' => ['eq'],
    ];
    protected $columnMap = [
        'thumb' => 'thumb',
        'save' => 'save',
        'comTxt' => 'com_txt',

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
