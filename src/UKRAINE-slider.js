import save_the_children from './images/ukraina-support/save-the-children.png';
import project_hope from './images/ukraina-support/project-hope.png';

const organizations = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: save_the_children,
    width: 131,
    height: 32,
  },
    {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: project_hope,
    width: 62,
    height: 32,
  }
  // {
  //   title: 'UNITED24',
  //   url: 'https://u24.gov.ua/uk',
  //   img: null,
  // },
  // {
  //   title: 'International Medical Corps',
  //   url: 'https://internationalmedicalcorps.org/country/ukraine/',
  //   img: null,
  // },
  // {
  //   title: 'Medicins Sans Frontieres',
  //   url: 'https://www.msf.org/ukraine',
  //   img: null,
  // },
  // {
  //   title: 'RAZOM',
  //   url: 'https://www.razomforukraine.org/',
  //   img: null,
  // },
  // {
  //   title: 'Action against hunger',
  //   url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
  //   img: null,
  // },
  // {
  //   title: 'World vision',
  //   url: 'https://www.wvi.org/emergencies/ukraine',
  //   img: null,
  // },
  // {
  //   title: 'Serhiy Prytula Charity Foundation',
  //   url: 'https://prytulafoundation.org/en',
  //   img: null,
  // },
];

const logoContainer = document.querySelector('.ukraine-solider');

function logoList() {
  const markup = organizations
    .map(({ title, url, img, width, height }, index) => {
      const paddedIndex = (index + 1).toString().padStart(2, '0');
      return `<div class="logo__item fund-item"><p class="fundNumber">${paddedIndex}</p>
      <a href="${url}" class="logo__img" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer nofollow" aria-label="${title}" >
            <picture>
      <source srcset="${img}" />
      <img src="${img}" alt="${title}" loading="lazy" width="${width}" height="${height}">
    </picture>
      </a>
      </div>`;
    })
    .join('');
  logoContainer.insertAdjacentHTML('beforeend', markup);
}

logoList();

// const orgList = document.getElementById('orgList');

// organizations.forEach(org => {
//   const listItem = document.createElement('li');

//   if (org.logo) {
//     const logo = document.createElement('img');
//     logo.src = org.logo;
//     logo.alt = org.title;
//     listItem.appendChild(logo);

//     logo.style.cursor = 'pointer';
//     logo.addEventListener('click', function () {
//       window.open(org.url, '_blank');
//     });
//   }

//   const link = document.createElement('a');
//   link.href = org.url;
//   link.textContent = org.title;
//   link.className = 'org-title';
//   listItem.appendChild(link);

//   orgList.appendChild(listItem);
// });
