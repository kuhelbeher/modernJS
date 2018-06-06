const data = [
	{
		name: 'John Doe',
		age: 32,
		gender: 'male',
		lookingfor: 'female',
		location: 'Boston MA',
		image: 'https://randomuser.me/api/portraits/men/82.jpg'
	},
	{
		name: 'Jenny Smith',
		age: 32,
		gender: 'female',
		lookingfor: 'male',
		location: 'Boston MA',
		image: 'https://randomuser.me/api/portraits/women/83.jpg'
	},
	{
		name: 'Jennifer Anniston',
		age: 32,
		gender: 'female',
		lookingfor: 'male',
		location: 'Boston MA',
		image: 'https://randomuser.me/api/portraits/women/42.jpg'
	},
	{
		name: 'Johnny Depp',
		age: 36,
		gender: 'male',
		lookingfor: 'female',
		location: 'Boston MA',
		image: 'https://randomuser.me/api/portraits/men/1.jpg'
	},
	{
		name: 'Leonardo Dicaprio',
		age: 32,
		gender: 'male',
		lookingfor: 'female',
		location: 'Boston MA',
		image: 'https://randomuser.me/api/portraits/men/22.jpg'
	}
];

const profiles = profileIterator(data);

// call next profile
nextProfile();

// next event
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
	const currentProfile = profiles.next().value;

	if (currentProfile !== undefined) {
		document.getElementById('profileDisplay').innerHTML = `
			<ul class="list-group">
				<li class="list-group-item">Name: ${currentProfile.name}</li>
				<li class="list-group-item">Age: ${currentProfile.age}</li>
				<li class="list-group-item">Location: ${currentProfile.location}</li>
				<li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor}</li>
			</ul>
		`;

		document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}" alt="${currentProfile.name}">`;
	} else {
		window.location.reload();
	}
}

// profile itarator
function profileIterator(profiles) {
	let nextIndex = 0;

	return {
		next: function() {
			return nextIndex < profiles.length ? 
			{ value: profiles[nextIndex++], done: false} :
			{ done: true }
		}
	}
}