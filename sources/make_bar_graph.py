import os
import pandas as pd
import numpy as np
import altair as alt
import json
import os
# npm install vega-lite vega-cli canvas


class BarGraph:

    def __init__(self, yearly_data):
        self.yearly_data = yearly_data

    def build_graph(self):
        
        with open(os.path.join(os.path.dirname(__file__), 'colors.json')) as f:
            colors = json.load(f)
        allColorsValues = []

        # filter data
        max_languages = 5
        top_languages = {}
        for year in self.yearly_data.keys():
            for quarter in self.yearly_data[year].keys():
                for language in sorted(list(self.yearly_data[year][quarter].keys()),
                                       key=lambda lang: self.yearly_data[year][quarter][lang], reverse=True)[
                                0:max_languages]:
                    if 'top' not in self.yearly_data[year][quarter]:
                        self.yearly_data[year][quarter]['top'] = {}
                    if self.yearly_data[year][quarter][language] != 0:
                        self.yearly_data[year][quarter]['top'][language] = self.yearly_data[year][quarter][language]

                        if language not in top_languages:
                            top_languages[language] = 1
                        top_languages[language] += 1

        # print(self.yearly_data)

        all_languages = list(top_languages.keys())

        for language in all_languages:
            if colors[language]['color'] is not None:
                allColorsValues.append(colors[language]['color'])

        languages_all_loc = {}

        for language in all_languages:
            language_year = []
            for year in self.yearly_data.keys():
                language_quarter = [0, 0, 0, 0]
                for quarter in self.yearly_data[year].keys():
                    if language in self.yearly_data[year][quarter]['top']:
                        language_quarter[quarter - 1] = self.yearly_data[year][quarter]['top'][language]
                    else:
                        language_quarter[quarter - 1] = 0
                language_year.append(language_quarter)
            languages_all_loc[language] = language_year

        # print(languages_all_loc)

        language_df = {}

        def prep_df(df, name):
            df = df.stack().reset_index()
            df.columns = ['c1', 'c2', 'values']
            df['Language'] = name
            return df

        for language in languages_all_loc.keys():
            language_df[language] = pd.DataFrame(languages_all_loc[language], index=list(self.yearly_data.keys()),
                                                 columns=["Q1", "Q2", "Q3", "Q4"])

        for language in language_df.keys():
            language_df[language] = prep_df(language_df[language], language)

        df = pd.concat(language_df.values())

        chart = alt.Chart(df).mark_bar().encode(

            # tell Altair which field to group columns on
            x=alt.X('c2:N', title=None),

            # tell Altair which field to use as Y values and how to calculate
            y=alt.Y('sum(values):Q',
                    axis=alt.Axis(
                        grid=False,
                        title='LOC added')),

            # tell Altair which field to use to use as the set of columns to be  represented in each group
            column=alt.Column('c1:N', title=None),

            # tell Altair which field to use for color segmentation
            color=alt.Color('Language:N',
                            scale=alt.Scale(
                                domain=all_languages,
                                # make it look pretty with an enjoyable color pallet
                                range=allColorsValues,
                            ),
                            )) \
            .configure_view(
            # remove grid lines around column clusters
            strokeOpacity=0
        )
        chart.save('bar_graph.png')
        return 'bar_graph.png'
