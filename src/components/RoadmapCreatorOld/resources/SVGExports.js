import React from "react";
import  "../subComponentStyles/RoadmapCreatorToolBar.scss"
export function eyeSvg(preview) {
  return (
    <svg
      viewBox="0 0 511.999 511.999"
      className={preview ? "icon selected" : "icon"}
    >
      <g>
        <path
          d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
		c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
		C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
		c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
		C447.361,287.923,358.746,385.406,255.997,385.406z"
        />
      </g>
      <g>
        <path
          d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
		s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
		s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"
        />
      </g>
    </svg>
  );
}

export function focusSvg(focus) {
  return (
    <svg viewBox="0 0 55 55" className={focus ? "icon selected" : "icon"}>
      <path
        d="M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17
	s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4
	c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562
	C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829
	c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91
	v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4
	s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665
	C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0z M11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2
	S11,10.103,11,9z M6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51z M33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4
	s1.794-4,4-4S33,46.794,33,49z M29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31z M47,41c0,1.103-0.897,2-2,2
	s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41z M49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z"
      />
    </svg>
  );
}

export function manualSvg(manual) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="512"
      height="512"
      className={manual ? "icon selected" : "icon"}
    >
      <g>
        <path d="M35,39H29a1,1,0,0,1-1-1V34.247c-.144-.057-.283-.115-.419-.174l-2.654,2.654a1,1,0,0,1-.707.293h0a1,1,0,0,1-.707-.293l-4.24-4.24a1,1,0,0,1,0-1.414l2.654-2.655c-.06-.135-.117-.274-.174-.418H18a1,1,0,0,1-1-1V21a1,1,0,0,1,1-1h3.753c.057-.144.114-.283.174-.419l-2.654-2.654a1,1,0,0,1,0-1.414l4.24-4.24a1.029,1.029,0,0,1,1.414,0l2.654,2.654c.136-.059.275-.117.419-.174V10a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v3.753c.144.057.283.115.419.174l2.654-2.654a1,1,0,0,1,.707-.293h0a1,1,0,0,1,.707.293l4.24,4.24a1,1,0,0,1,0,1.414l-2.654,2.654c.06.136.117.275.174.419H46a1,1,0,0,1,1,1v6a1,1,0,0,1-1,1H42.247c-.057.144-.114.283-.174.418l2.654,2.655a1,1,0,0,1,0,1.414l-4.24,4.24a1.029,1.029,0,0,1-1.414,0l-2.654-2.654c-.136.059-.275.117-.419.174V38A1,1,0,0,1,35,39Zm-5-2h4V33.54a1,1,0,0,1,.693-.952,8.112,8.112,0,0,0,1.446-.605,1,1,0,0,1,1.188.17l2.453,2.453,2.825-2.826-2.452-2.453a1,1,0,0,1-.17-1.187,8.225,8.225,0,0,0,.605-1.446A1,1,0,0,1,41.54,26H45V22H41.54a1,1,0,0,1-.952-.694,8.225,8.225,0,0,0-.605-1.446,1,1,0,0,1,.17-1.187l2.452-2.453L39.78,13.394l-2.453,2.453a1,1,0,0,1-1.188.17,8.112,8.112,0,0,0-1.446-.6A1,1,0,0,1,34,14.46V11H30v3.46a1,1,0,0,1-.693.952,8.112,8.112,0,0,0-1.446.6,1,1,0,0,1-1.188-.17L24.22,13.394,21.4,16.22l2.452,2.453a1,1,0,0,1,.17,1.187,8.225,8.225,0,0,0-.605,1.446A1,1,0,0,1,22.46,22H19v4h3.46a1,1,0,0,1,.952.694,8.225,8.225,0,0,0,.605,1.446,1,1,0,0,1-.17,1.187L21.4,31.78l2.825,2.826,2.453-2.453a1,1,0,0,1,1.188-.17,8.112,8.112,0,0,0,1.446.605A1,1,0,0,1,30,33.54Z" />
        <path d="M32,30a6,6,0,1,1,6-6A6.006,6.006,0,0,1,32,30Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,32,20Z" />
        <path d="M56,46a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H13A6.006,6.006,0,0,0,7,8V50a6.006,6.006,0,0,0,6,6h3v5a1,1,0,0,0,1.707.707L21,58.414l3.293,3.293A1,1,0,0,0,26,61V56H56a1,1,0,0,0,0-2,4,4,0,0,1,0-8ZM24,58.586l-2.293-2.293a1,1,0,0,0-1.414,0L18,58.586V51h6ZM51.54,54H26V51H47a1,1,0,0,0,0-2H12a1,1,0,0,0,0,2h4v3H13a4,4,0,1,1,0-8H51.54a5.965,5.965,0,0,0,0,8ZM13,44a5.992,5.992,0,0,0-4,1.531V8a4,4,0,0,1,4-4H55V44Z" />
      </g>
    </svg>
  );
}

export function paletteSvg(isSelected) {
  return (
    <svg
      id="Capa_1"
      enableBackground="new 0 0 510 510"
      height="512"
      viewBox="0 0 510 510"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      className={isSelected ? "MetaCardIcon selected" : "MetaCardIcon"}
    >
      <path d="m108.649 194.85c-30.425 0-55.177 24.752-55.177 55.177s24.752 55.177 55.177 55.177 55.177-24.752 55.177-55.177-24.752-55.177-55.177-55.177zm0 80.356c-13.883 0-25.179-11.295-25.179-25.179s11.296-25.179 25.179-25.179 25.179 11.295 25.179 25.179-11.296 25.179-25.179 25.179z" />
      <path d="m206.358 325.171c-30.424 0-55.176 24.752-55.176 55.177 0 30.424 24.752 55.176 55.176 55.176 30.425 0 55.177-24.752 55.177-55.176 0-30.425-24.752-55.177-55.177-55.177zm0 80.355c-13.883 0-25.178-11.295-25.178-25.179s11.295-25.179 25.178-25.179c13.884 0 25.179 11.295 25.179 25.179.001 13.884-11.295 25.179-25.179 25.179z" />
      <path d="m496.18 324.693c-.099-.098-.198-.194-.299-.29l-51.938-49.011c29.074-21.984 42.208-60.897 30.264-96.895-56.309-169.883-272.685-223.779-401.614-96.798-96.561 95.102-95.66 248.445-4.044 342.874 82.305 84.831 211.993 96.745 307.711 34.089 44.824-29.332 24.217-99.152-29.421-99.152-40.06 0-46.792-56.011-8.951-65.602l91.503 96.974c.096.101.192.201.291.3 18.343 18.385 48.139 18.434 66.53.042 18.389-18.388 18.389-48.152-.032-66.531zm-193.801 47.105c12.051 11.42 27.84 17.709 44.461 17.709 23.956 0 32.988 30.972 12.993 44.056-83.775 54.84-197.555 44.538-269.754-29.878-80.978-83.463-80.501-217.407 3.896-300.423 113.093-111.242 302.248-64.702 351.759 84.677 8.389 25.283-2.094 52.756-24.082 66.419l-83.314-78.619c5.044-24.218-1.942-49.749-20.246-68.052-22.973-22.974-95.346-34.425-126.711-37.832-9.513-1.036-17.568 7.006-16.533 16.533 3.435 31.487 14.819 103.696 37.833 126.711 18.316 18.314 43.86 25.286 68.059 20.243l35.094 37.192c-37.37 20.287-44.958 71.41-13.455 101.264zm-68.487-179.911c-11.303-11.303-21.402-54.292-26.734-89.723 35.432 5.331 78.421 15.431 89.723 26.734 17.404 17.404 17.407 45.58 0 62.989-17.365 17.367-45.547 17.442-62.989 0zm241.11 178.126c-6.61 6.61-17.308 6.64-23.957.107-7.678-8.137-134.279-142.308-141.333-149.783 5.918-4.395 11.222-9.699 15.623-15.623l149.784 141.343c6.539 6.656 6.503 17.335-.117 23.956z" />
    </svg>
  );
}

export function infoSvg(isSelected) {
  return (
    <svg
      height="512pt"
      viewBox="0 0 512 512"
      width="512pt"
      xmlns="http://www.w3.org/2000/svg"
      className={isSelected ? "MetaCardIcon selected" : "MetaCardIcon"}
    >
      <path d="m277.332031 128c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0" />
      <path d="m256 405.332031c-8.832031 0-16-7.167969-16-16v-165.332031h-21.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h37.332031c8.832031 0 16 7.167969 16 16v181.332031c0 8.832031-7.167969 16-16 16zm0 0" />
      <path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" />
      <path d="m304 405.332031h-96c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h96c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
    </svg>
  );
}

export function uploadSvg(isSelected) {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 486.3 486.3"
      className={isSelected ? "MetaCardIcon selected" : "MetaCardIcon"}
    >
      <g>
        <path
          d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
  			c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
  			C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
  			c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
  			c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
  			c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
  			c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
  			c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"
        />
        <path
          d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
  			c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
  			C310.4,285.3,318.9,285.3,324.2,280z"
        />
      </g>
    </svg>
  );
}
