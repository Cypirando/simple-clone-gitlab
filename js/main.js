let projetos = [];
const endPointApi =
  'https://raw.githubusercontent.com/daniel-prando/simple-clone-gitlab/main/projetos.json';
getApi();
const inserirProjetos = document.getElementById('projects');
const campoDeBusca = document.querySelector("input[type='search']");

async function getApi() {
  const res = await fetch(endPointApi);
  projetos = await res.json();
  console.log(projetos);
  exibeprojetos(projetos);
  rodarCheckBoxStatus(projetos);
}

function exibeprojetos(listaProjetos) {
  listaProjetos.forEach((element,i) => {
    inserirProjetos.innerHTML += `
        <div class="all-projects">
                <div class="row">
                    <div class="name-project">
                        <div class="card-project">
                            <i class="fal fa-door-open"
                                style="padding: 2px 8px 0 0; font-size: 18px;opacity: 0.6; color:#fff;"></i>
                            <div class="bg-${i} card-word initial-words-one">
                            ${element.projectName.split('')[0]}
                            </div>
                        </div>
                        <div class="line-description">
                            <div class="line-name">
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
                            <div class="description-project">
                                <sub>${element.description}</sub>
                            </div>
                        </div>
                    </div>
                    <div class="star-project">
                        <input type="checkbox" class="star" onclick="salvar()" name="curtir" id="${
                          element.id
                        }" value="checkedValue">
                        <label for="checkedValue" id="${
                          element.id + 'label'
                        }"class="star-label">0</label>
                    </div>
                    <div class="time-project">
                        <samp>${element.lastUpdate
                          .substr(11, 5)
                          .split('-')
                          .reverse()
                          .join(':')}
                        </samp>
                    </div>
                </div>

                <span class="line-block"></span>

            </div>
        `;
  });
}

campoDeBusca.addEventListener('keyup', (tecla) => {
  const procuraLetra = tecla.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  console.log(procuraLetra)
  const capturaProjeto = projetos.filter((letra) => {
    return (
      letra.projectName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(procuraLetra) ||
      letra.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(procuraLetra)
    );
  });
  inserirProjetos.innerHTML = '';
  console.log(capturaProjeto)
  exibeprojetos(capturaProjeto);
  rodarCheckBoxStatus(capturaProjeto);
});
function salvar() {
  projetos.forEach((i) => {
    let numeroLabel = document.getElementById(i.id + 'label');
    let favorito = document.getElementById(i.id);
    if (favorito.checked) {
      numeroLabel.innerHTML = 0;
      localStorage.setItem(i.id, JSON.stringify(favorito.checked));
    } else {
      localStorage.setItem(i.id, JSON.stringify(false));
      numeroLabel.innerHTML = 1;
    }
  });
}
function rodarCheckBoxStatus(teste) {
  teste.forEach((i) => {
    let numeroLabel = document.getElementById(i.id + 'label');
    let favorito = document.getElementById(i.id);
    if (localStorage.getItem(i.id) === 'true') {
      favorito.checked = true;
      numeroLabel.innerHTML = 0;
    } else {
      favorito.checked = false;
      numeroLabel.innerHTML = 1;
    }
  });
}
