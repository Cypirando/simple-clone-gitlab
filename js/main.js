let projetos = []
const endPointApi = 'https://raw.githubusercontent.com/daniel-prando/simple-clone-gitlab/main/projetos.json'
getApi()
const inserirProjetos = document.getElementById('projects')

async function getApi() {
    const res = await fetch(endPointApi)
    projetos = await res.json()
    console.table(projetos)
    exibeprojetos(projetos)
}

function exibeprojetos(listaProjetos) {
    listaProjetos.forEach(element => {
        inserirProjetos.innerHTML += `
        <!-- projetos  -->
        <div class="all-projects">
            <div class="row">
                <div class="name-project">
                    <i class="fal fa-door-open"
                        style="padding: 14px 8px 0 0; font-size: 18px;opacity: 0.6; color:#fff;"></i>
                    <div class="bg-tree card-word initial-words-one">
                    ${element.projectName.split('')[0]}
                    </div>
                    <h5 class="h5-name">
                        ${element.projectName}
                        <i class="fal fa-lock-alt" style="padding: 0 5px; font-size:12px;opacity: 0.6;"></i>
                    </h5>
                    <div class="role-project">
                        <span>
                            ${element.role}
                        </span>
                    </div>
                </div>
                <div class="star-project">
                    <input type="checkbox" class="star" name="curtir" id=""
                        value="checkedValue">
                    <label for="checkedValue" class="star-label">1</label>

                </div>
                <div class="time-project">
                    <samp>${element.lastUpdate.substr(11, 5).split('-').reverse().join(':')}</samp>

                </div>
            </div>
        </div>

        <!-- linha  -->
        <span class="line-block"></span>
        `
    });
}