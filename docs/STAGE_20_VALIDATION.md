# v0.20 checkpoint — transparent promotion and internal points

Passed before the final cross-project audit:

- promotion quote exposes base price, duration, occupied places, demand surcharge and final rounded price;
- slot limits remain hard limits and cannot be bypassed by paying more;
- the same publication cannot buy a second active promotion of the same type;
- expired orders leave active inventory automatically;
- users can stop an order with a required reason;
- a full automatic refund is available only during the documented 10-minute grace period;
- later cancellation stops promotion without an automatic refund;
- administrative refunds require a reason and create an audit entry;
- wallet shows active orders, history and transactions without implying real-money value;
- no real top-up, withdrawal, payout or payment provider was added;
- 42/42 autonomous tests passed after this stage;
- static, UX truthfulness and literal-route validation passed.

Noise review: pricing configuration and order control share one Control Center tab; promotion did not add another global navigation item.
