def filter_out_projects(projects, projects_to_skip):
    new_projects = []
    for project in projects:
        if project['name'] not in projects_to_skip:
            new_projects.append(project)

    return new_projects
