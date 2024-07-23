export type Payment = {
	_id: string;
	amount: number;
	created_at: Date;
	description: string | null;
	due_date: Date;
	month: number;
	paid_date: Date;
	payment_type: 'monthly' | 'annual';
	payment_with:
		| 'credit_card'
		| 'cash'
		| 'bank_transfer'
		| 'mobile_payment'
		| 'other';
	province: string;
	status: 'paid' | 'pending' | 'overdue';
	user_id: string;
	year: number;
	isManuallySet?: boolean;
};

export type FormState = {
	user_id: string;
	months_and_amounts: { [key: number]: number };
	payment_with:
		| 'credit_card'
		| 'cash'
		| 'bank_transfer'
		| 'mobile_payment'
		| 'other';
	year: number;
	status: 'paid' | 'pending' | 'overdue';
	paid_date: string;
	province: string;
	default_amount: number;
};