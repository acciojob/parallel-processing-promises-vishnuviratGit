//your JS code here. If required.

const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
let loading=document.getElementById("loading");
let output=document.getElementById("output");
let errorDiv=document.getElementById("error");
function downloadImage(url){
	return new Promise((resolve, reject)=>{
		  const img=new Image();
		  img.src=url;
		  img.onload=()=>resolve(img);
		  img.onerror=()=>reject(`Failed to download the image ${url}`);
	})
}

async function downloadImages() {
	loading.style.display="block";
	output.innerHTML="";
	errorDiv.innerHTML="";
	
	try {
		loading.style.display="none";
	    const arrPromises= await Promise.all([downloadImage(images[0].url), downloadImage(images[1].url), downloadImage(images[2].url)]);
		output.style.display="block";
		arrPromises.forEach((img)=>{
			output.appendChild(img);
		})
	} catch (error) {
		loading.style.display="none";
		errorDiv.style.display="block";
		errorDiv.innerHTML=error;
	}
}
btn.addEventListener("click", downloadImages);
