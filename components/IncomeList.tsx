import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

export interface Income {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface IncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export function IncomeList({ incomes, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        <p>No income entries yet. Add your first entry above!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {incomes.map((income) => (
        <Card key={income.id} className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-semibold">${income.amount.toFixed(2)}</span>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Tag className="h-3 w-3" />
                  {income.category}
                </span>
              </div>
              {income.description && (
                <p className="text-sm text-muted-foreground">{income.description}</p>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {format(new Date(income.date), "MMM dd, yyyy")}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(income.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
