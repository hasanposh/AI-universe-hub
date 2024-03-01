const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await response.json();
    const platfromsAI = data.data.tools
    showData(platfromsAI);
    // console.log(platfromsAI)
}

const showData = (platfromsAI) => {
    const cardContainer = document.getElementById('card-container')
    // console.log(platfromsAI[0].features)
     
    platfromsAI.forEach((singleAi) => {
        // console.log(singleAi.features)
        const singelCard = document.createElement('div')
        // const features = singleAi.features
        // for (const feature of features) {
        //     singelCard.innerHTML = `
        //     <p class="text-gray-600"> 1.
        //         <span>${feature}</span>
        //       </p>
        //     `
        //     console.log(feature)
        // }

        singelCard.classList = `card w-full border-2 border-gray-200`
        singelCard.innerHTML = `
        <figure>
              <img
                src= '${singleAi.image}'
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">Features</h2>
              <p class="text-gray-600"> 1.
                <span>${singleAi.features[0]}</span>
              </p>
              <p class="text-gray-600"> 2.
                <span>${singleAi.features[1]}</span>
              </p>
              <p class="text-gray-600"> 3.
                <span>${singleAi.features[2]}</span>
              </p>
              
              
              <hr />

              <div class="card-actions justify-between">
                <div>
                  <h2 class="card-title">${singleAi.name}</h2>
                  <p>
                    <i class="fa-solid fa-calendar-days"></i><span> ${singleAi.published_in}</span>
                  </p>
                </div>
                <button onclick="my_modal.showModal(),showDetails('${singleAi.id}')" class="btn text-red-600 bg-red-50 rounded-full">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
        `


        cardContainer.appendChild(singelCard)
    });

}

const showDetails = async(id) => {
    console.log(id)
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await response.json();
    const singleAi = data.data


    const modalBox = document.getElementById('modal-box')
    const modalLeftBox = document.createElement('div')
    const modalRightBox = document.createElement('div')
    modalBox.innerHTML = ''
    modalLeftBox.classList = `flex-1 rounded-xl bg-red-100 border-2 border-red-300 space-y-2 p-5`
    modalLeftBox.innerHTML = `
    <h3 class="text-3xl font-bold">
    ${singleAi.description}
  </h3>
  <div class=" flex gap-3 ">
    <div class="bg-white text-center rounded-lg text-green-600 p-4 font-bold">
    <p>${singleAi.pricing[0].plan}</p>
    <p>${singleAi.pricing[0].price}</p>
    </div>
    <div class="bg-white text-center rounded-lg text-orange-400 p-4 font-bold">
    <p>${singleAi.pricing[1].plan}</p>
    <p>${singleAi.pricing[1].price}</p>
    </div>
    <div class="bg-white text-center rounded-lg text-red-600 p-4 font-bold">
    <p>${singleAi.pricing[2]?.plan}</p>
    <p>${singleAi.pricing[2]?.price}</p>
    </div>
    
    
  </div>
  <div class="flex justify-between">
      <div > 
          <h3 class="text-3xl font-bold">Features</h3>
          <ul class="list-disc p-2">
              <li>${singleAi.features[1].feature_name}</li>
              <li>${singleAi.features[2].feature_name}</li>
              <li>${singleAi.features[3].feature_name}</li>
          </ul>
      </div>
      <div>
          <h3 class="text-3xl font-bold">Integrations</h3>
          <ul class="list-disc p-2">
              <li>${singleAi.integrations[0]}</li>
              <li>${singleAi.integrations[1]}</li>
              <li>${singleAi.integrations[2]}</li>
          </ul>
      </div>
      
  </div>
</div>
    `
    modalRightBox.classList = `flex-1 rounded-xl border-2 border-grey-300 space-y-2 p-5`
    modalRightBox.innerHTML = `
                <img src="${singleAi.image_link[0]}" alt="">
                <h3 class="font-bold text-center text-3xl">${singleAi.input_output_examples[0].input}</h3>
                <p class="px-10 text-center">${singleAi.input_output_examples[0].output}</p>
    `
    modalBox.appendChild(modalLeftBox)
    modalBox.appendChild(modalRightBox)
    
}

loadData();