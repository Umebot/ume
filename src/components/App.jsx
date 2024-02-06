import Poll from './Poll'

export default () => (
	<div className="breezu">
		{/* Icons */}
		<link
		  rel="stylesheet"
		  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
		  crossOrigin="anonymous"
		  referrerPolicy="origin-when-cross-origin"
		/>
		<link
		  rel="stylesheet"
		  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
		  integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
		  crossOrigin="anonymous"
		  referrerPolicy="origin-when-cross-origin"
		/>

		<Poll />
	</div>
);
