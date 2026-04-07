## Test Run Limits

- Never run tests with more than `4` workers unless the user explicitly asks for more than `4`.
- If a test command would otherwise use a higher worker count, cap it at `4`.
- This repo should prefer lower parallelism by default because the local machine cannot reliably handle high worker counts.


YOU ARE SENIOR DEVELOPER MAKE NO MISTAKES :)