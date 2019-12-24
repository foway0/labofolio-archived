import { ErrorHandler } from '../types/custom_functions';

export const errorHandler: ErrorHandler = (err, req, res, next): void => {
  // Will get here
  if (err.status && err.status === 404) {
    console.log(`what??? (╯°□°）╯︵ ┻━┻`);
    res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
  } else {
    res.status(500).end();
  }
};
