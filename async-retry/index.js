// A dummy promise to resolve only non-negative values
const request = function request(value) {
  return new Promise(function(resolve, reject) {
    if (value >= 0) {
      resolve(value);
    } else {
      reject(new Error(`negative values cannot be resolved: ${value}`));
    }
  });
};

// A dummy promise to emulate pause for some time in secs
const pause = function pause(secs) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, secs * 1000);
  });
};

// An async task to resolve the very first random non-negative number
const task = async function task(retries) {
  for (let i = 1; i <= retries; i++) {
    // Get a random number in the range [-1, 1)
    let value = (Math.random() * 2) - 1;

    try {
      return await request(value);
    } catch (err) {
      console.log(`Request failed, ${err.message}`);

      if (i < retries) {
        console.log(` Retry again after 2 secs...`);
        await pause(2);
      }
    }
  }

  throw new Error(`reached maximum number of retries: ${retries}`);
};

task(3)
  .then(function(value) {
    console.log(`Task succeed, resolved value: ${value}`);
  })
  .catch(function(err) {
    console.log(`Task failed, ${err.message}`);
  });
