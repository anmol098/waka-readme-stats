def generate_repo_list():
    result = run_query(repositoryListQuery.substitute(username=user))
    language_count={}
    for repo in result['data']['user']['repositories']['edges']:
        if repo['node']['primaryLanguage'] is None:
            continue
        language=repo['node']['primaryLanguage']['name']
        color_code=repo['node']['primaryLanguage']['color']
        if language not in language_count.keys():
            language_count[language]={}
            language_count[language]['count']=1
            language_count[language]['color']=color_code
        else:
            language_count[language]['count']=language_count[language]['count']+1
            language_count[language]['color']=color_code
        

    labels = language_count.keys()
    sizes = list(map(lambda x: language_count[x]['count'] , labels)) 
    colors = list(map(lambda x: language_count[x]['color'] , labels))
    explode = tuple(map(lambda x: 0 , labels))
    # Plot
    patches, texts = plt.pie(sizes ,colors=colors, startangle=140, radius=1,labels=labels)
    
    # plt.legend(patches, labels, loc='center right', bbox_to_anchor=(1, 0.5),
    #        fontsize=8, bbox_transform=plt.gcf().transFigure)
    # plt.subplots_adjust(left=0.0, bottom=0.1, right=2)
    plt.savefig('repo.png',bbox_inches="tight")
    g = Github(ghtoken)
    repo = g.get_repo(f"{user}/{user}")
    with open('repo.png', 'rb') as input_file:
        data = input_file.read()
    try:
        contents = repo.get_contents("charts/repo.png")
        repo.update_file(contents.path, "Charts Added", data, contents.sha)
    except Exception as e:
        repo.create_file("charts/repo.png", "Initial Commit",data)
    print("pushed")
    