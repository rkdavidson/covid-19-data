import csv
#
# Utils
# -----------------------------------------------------------------------

def numeral(value):
    return f'{value:,}'

def read_csv(path, row_parser):
    """Reads a CSV file from path with a method to process rows"""
    output = {}

    with open(path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        # index = 0

        for index, row in enumerate(csv_reader):
            if index != 0:
                row_parser(index, row, output)
            # index += 1

    return output

# States Data
# -----------------------------------------------------------------------

def process_states():
    # states = read_csv('./us-states.csv', process_state_row)
    census = read_csv('./rkd-us-census.csv', process_state_census_row)
    print('census: ', census)

    # with open('./processed/us-states.csv', 'w', newline='\n') as csvfile:
    #     writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    #     writer.writerow(('state:String', 'fips:String', 'date:Date', 'cases:Int', 'cases_cumulative:Int', 'deaths:Int', 'deaths_cumulative:Int'))

    #     for fips in states:
    #         del states[fips][0]

    #         for day in states[fips]:
    #             state, date, cases, cases_cumulative, deaths, deaths_cumulative = day.values()
    #             writer.writerow((state, fips, date, cases, cases_cumulative, deaths, deaths_cumulative))

    with open('./processed/sql-tables/states.csv', 'w', newline='\n') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(('fips:Int', 'name:String', 'region:Int', 'division:Int', 'population:Int'))

        for row in census['rows']:
            print('row: ', row)
            # fips, date, cases, cases_cumulative, deaths, deaths_cumulative = states[fips][0].values()
            writer.writerow(row)

def process_state_row(index, row, output):
    date, state, fips, cases, deaths = row

    if fips not in output:
        output[fips] = [
            {
                "cases_cumulative": 0,
                "deaths_cumulative": 0
            }
        ]

    last_entry = output[fips][-1]

    output[fips].append({
        "fips": fips,
        "date": date,
        "cases": int(cases) - last_entry["cases_cumulative"],
        "cases_cumulative": int(cases),
        "deaths": int(deaths) - last_entry["deaths_cumulative"],
        "deaths_cumulative": int(deaths)
    })

def process_state_census_row(index, row, output):
    if index >= 6:
        region = row[1] # REGION
        division = row[2] # DIVISION
        fips = row[3] # STATE
        name = row[4] # NAME
        population = int(row[16]) # POPESTIMATE2019

        output_row = [fips, name, region, division, population]

        if 'rows' not in output:
            output['rows'] = [output_row]
        else:
            output['rows'].append(output_row)

# Census Data
# -----------------------------------------------------------------------

def process_census():
    populations = read_csv('./rkd-us-census.csv', process_census_row)

    with open('./processed/us-state-populations.csv', 'w', newline='\n') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(('state:String', 'population:Int'))

        for state in populations:
            print(f'{state}: {numeral(populations[state])}')
            writer.writerow((state, populations[state]))

def process_census_row(index, row, output):
    if index == 1 or index >= 6:
        state = row[4] # NAME
        population = int(row[16]) # POPESTIMATE2019
        output.push()

# Program
# -----------------------------------------------------------------------

if __name__ == "__main__":
    process_states()
    # process_census()