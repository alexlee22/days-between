# DAYS-BETWEEN

Tested using:

- `NodeJS ^v11.11.0`
- `npm ^v6.7.0`
- `python 3.7.2` for testing with shell

### Install

`npm install -g`

Check `package.json` and `index.js` for more details.

### Use

```
date-calculator -s <DD/MM/YYYY> -e <DD/MM/YYYY>
```

Where `<DD/MM/YYYY>` is a date string which lies between `01/01/1901` and `31/12/2999`. For example

```
date-calculator -s 01/08/2018 -e 20/06/2201
> 66796 days
```

### Testing

1. Generate a list with python `python generateRandomDates.py`. Output result in `testdates.csv` in the same folder.
2. Run shell script by entering `./testdates.sh` in terimal.

The python script will print random dates and it's result in a `.csv` fileCheck `generateRandomDates.py` and `testdates.sh` for more details.

The script will print any errors.
