import React from 'react';
import PropTypes from 'prop-types';
// https://www.flaticon.com/packs/arrow-set-2

export const BackArrowWhite = () => (
  <svg viewBox='0 0 240 240' width='20' height='20'>
    <g>
      <path d='M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179   l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816   C52.942,116.507,52.942,124.327,57.633,129.007z' fill='#FFFFFF'/>
    </g>
  </svg>
);

export const ForwardArrowBlack = () => (
  <svg viewBox='0 0 240 240' width='20' height='20'>
    <g>
      <path d='M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
    l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
    C187.881,124.315,187.881,116.495,183.189,111.816z'/>
    </g>
  </svg>
);

export const AdditionSymbol = () => (
  <svg viewBox='0 0 42 42' width='20' height='20'>
    <polygon points='42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 '/>
  </svg>
);

export const SubtractionSymbol = () => (
  <svg viewBox='0 0 42 42' width='20' height='20'>
    <rect y='20' width='42' height='2'/>
  </svg>
);

// https://www.flaticon.com/free-icon/arrows-circle_32220#term=circle%20arrows&page=1&position=92
export const FlipArrows = ({ colour, height }) => (
  <svg height={height} viewBox="-16 -18 533.33331 533" width={height} fill={colour}>
    <path d="M479,265.166c0,57.977-25.452,112.68-69.818,150.09l-38.538-45.727c30.854-26.013,48.551-64.055,48.551-104.363
    c0-72.504-56.885-131.795-128.352-136.009h-29.253l24.636,62.368c0.828,2.086,0.154,4.471-1.643,5.822
    c-1.791,1.356-4.268,1.351-6.053-0.024l-122.498-94.185c-1.229-0.952-1.954-2.403-1.954-3.966c0-1.554,0.724-3.021,1.954-3.963
    L278.542,1.029C279.434,0.337,280.504,0,281.58,0c1.063,0,2.122,0.331,3.015,1.005c1.797,1.348,2.465,3.742,1.643,5.828
    l-24.636,62.358l21.185,0.062v-0.316c7.571,0,15.043,0.479,22.396,1.321c4.877,0.508,10.32,1.229,14.452,2.202
    C410.257,89.761,479,169.562,479,265.166z M264.737,345.957c-1.779-1.377-4.262-1.383-6.053-0.023
    c-1.791,1.354-2.461,3.736-1.64,5.828l24.636,62.365h-29.252c-71.452-4.221-128.346-63.518-128.346-136.014
    c0-37.728,15.058-72.832,42.398-98.845l-41.231-43.326C85.93,173.36,64.276,223.844,64.276,278.113
    c0,95.596,68.733,175.402,159.375,192.703c4.14,0.97,9.581,1.69,14.455,2.199c7.353,0.845,14.818,1.324,22.396,1.324v-0.319
    l21.184,0.064l-24.636,62.358c-0.827,2.099-0.15,4.486,1.64,5.828c0.896,0.674,1.951,1.005,3.015,1.005
    c1.079,0,2.143-0.337,3.044-1.028l122.492-94.188c1.229-0.94,1.956-2.406,1.956-3.961c0-1.561-0.727-3.014-1.956-3.96
    L264.737,345.957z"/>
  </svg>
);

FlipArrows.propTypes = {
  height: PropTypes.number.isRequired,
  colour: PropTypes.string.isRequired,
};

export const GoldCup = ({ height }) => (
  <svg viewBox="0 0 512 512" height={height} width={height}>
    <g>
      <path style={{fill:'#FFB125'}} d="M43.222,142.462c11.795-12.868,24.155-24.449,37.764-35.199c1.6-1.264,3.904,0.249,3.369,2.217
        c-7.628,28.037-20.956,55.744-41.501,76.342C41.931,171.402,41.917,156.862,43.222,142.462z"/>
      <path style={{fill:'#FFB125'}} d="M42.855,185.833c-11.862-14.315-22.055-29.115-31.24-45.093c-1.05-1.827-3.844-1.175-3.95,0.93
        c-1.657,32.731,10.849,71.028,41.317,86.474C45.945,214.225,43.757,200.06,42.855,185.833z"/>
      <path style={{fill:'#FFB125'}} d="M48.979,228.133c7.465-15.36,15.821-29.651,25.616-43.503c1.162-1.644,3.768-0.89,3.852,1.121
        c1.193,28.273-3.658,58.161-17.205,82.981C56.221,255.521,51.984,241.951,48.979,228.133z"/>
      <path style={{fill:'#FFB125'}} d="M61.245,268.741c-15.403-9.899-29.473-20.723-42.97-32.881c-1.557-1.402-3.999,0.062-3.472,2.09
        c8.131,31.263,31.383,63.345,64.487,69.012C72.409,294.673,66.245,281.918,61.245,268.741z"/>
      <path style={{fill:'#FFB125'}} d="M79.286,306.953c2.698-16.757,6.558-32.743,11.93-48.724c0.639-1.901,3.338-1.937,4.007-0.047
        c9.395,26.525,13.202,56.451,7.533,83.953C94.139,330.983,86.167,319.262,79.286,306.953z"/>
      <path style={{fill:'#FFB125'}} d="M102.762,342.144c-17.558-4.974-34.146-11.195-50.574-18.82c-1.898-0.881-3.8,1.23-2.706,3.014
        c16.891,27.545,48.514,51.394,81.821,47.284C121.079,363.826,111.418,353.361,102.762,342.144z"/>
      <path style={{fill:'#FFB125'}} d="M131.296,373.614c-2.396-16.884-3.413-33.35-2.943-50.277c0.056-2.006,2.63-2.829,3.821-1.213
        c16.823,22.808,29.373,50.514,32.377,78.602C152.852,392.506,141.62,383.52,131.296,373.614z"/>
      <path style={{fill:'#FFB125'}} d="M468.78,142.462c-11.795-12.868-24.155-24.449-37.764-35.199c-1.6-1.264-3.904,0.249-3.369,2.217
        c7.628,28.037,20.956,55.744,41.501,76.342C470.072,171.402,470.086,156.862,468.78,142.462z"/>
      <path style={{fill:'#FFB125'}} d="M469.148,185.833c11.862-14.315,22.055-29.115,31.24-45.093c1.05-1.827,3.844-1.175,3.95,0.93
        c1.657,32.731-10.849,71.028-41.317,86.474C466.058,214.225,468.245,200.06,469.148,185.833z"/>
      <path style={{fill:'#FFB125'}} d="M463.023,228.133c-7.465-15.36-15.821-29.651-25.616-43.503c-1.162-1.644-3.768-0.89-3.852,1.121
        c-1.193,28.273,3.658,58.161,17.205,82.981C455.782,255.521,460.018,241.951,463.023,228.133z"/>
      <path style={{fill:'#FFB125'}} d="M450.757,268.741c15.403-9.899,29.473-20.723,42.97-32.881c1.557-1.402,3.999,0.062,3.472,2.09
        c-8.131,31.263-31.383,63.345-64.487,69.012C439.593,294.673,445.758,281.918,450.757,268.741z"/>
      <path style={{fill:'#FFB125'}} d="M432.717,306.953c-2.698-16.757-6.558-32.743-11.93-48.724c-0.639-1.901-3.338-1.937-4.007-0.047
        c-9.395,26.525-13.202,56.451-7.533,83.953C417.863,330.983,425.835,319.262,432.717,306.953z"/>
      <path style={{fill:'#FFB125'}} d="M409.24,342.144c17.558-4.974,34.146-11.195,50.574-18.82c1.898-0.881,3.8,1.23,2.706,3.014
        c-16.891,27.545-48.514,51.394-81.821,47.284C390.923,363.826,400.585,353.361,409.24,342.144z"/>
      <path style={{fill:'#FFB125'}} d="M380.706,373.614c2.396-16.884,3.413-33.35,2.943-50.277c-0.056-2.006-2.63-2.829-3.821-1.213
        c-16.823,22.808-29.373,50.514-32.377,78.602C359.15,392.506,370.382,383.52,380.706,373.614z"/>
    </g>

    <path style={{fill:'#FED130'}} d="M206.689,400.236h98.625c-40.853-51.806-36.59-126.469-36.59-126.469h-12.723h-12.722
      C243.279,273.767,247.542,348.43,206.689,400.236z"/>
    <path style={{fill:'#F7BC14'}} d="M268.724,273.767h-12.723h-12.722c0,0,0.66,11.592-1.038,28.81
      c-3.236,32.818,4.905,65.924,24.112,92.73c1.192,1.663,2.426,3.307,3.705,4.929h35.256
      C264.461,348.43,268.724,273.767,268.724,273.767z"/>
    <path style={{fill:'#FED130'}} d="M181.605,141.368v65.431c0,38.711,18.398,75.117,49.565,98.078l0,0
      c14.767,10.879,34.896,10.879,49.663,0l0,0c31.166-22.961,49.565-59.367,49.565-98.078v-65.431H181.605z"/>
    <path style={{fill:'#F7BC14'}} d="M294.974,141.368v65.431c0,38.711-18.398,75.117-49.564,98.078l0,0
      c-2.26,1.665-4.647,3.073-7.12,4.228c13.684,6.393,30.036,4.986,42.543-4.228l0,0c31.166-22.961,49.565-59.367,49.565-98.078
      v-65.431H294.974z"/>
    <path style={{fill:'#FFB125'}} d="M335.727,151.59H176.276c-2.403,0-4.351-1.948-4.351-4.351v-18.032c0-2.403,1.948-4.351,4.351-4.351
      h159.451c2.403,0,4.351,1.948,4.351,4.351v18.032C340.077,149.642,338.129,151.59,335.727,151.59z"/>
    <path style={{fill:'#FF901D'}} d="M335.727,124.856h-31.072v26.734h31.072c2.403,0,4.351-1.948,4.351-4.351v-18.032
      C340.077,126.804,338.13,124.856,335.727,124.856z"/>
    <path style={{fill:'#FFB125'}} d="M340.605,431.856h-168.54c-2.443,0-4.139-2.433-3.293-4.725l12.516-33.914
      c0.509-1.379,1.823-2.295,3.293-2.295h143.508c1.47,0,2.784,0.916,3.293,2.295l12.516,33.914
      C344.744,429.422,343.048,431.856,340.605,431.856z"/>
    <path style={{fill:'#FF901D'}} d="M343.898,427.13l-12.516-33.914c-0.509-1.379-1.823-2.295-3.293-2.295h-34.23l15.107,40.933h31.639
      C343.048,431.856,344.744,429.422,343.898,427.13z"/>
    <path d="M500.159,229.199c-3.667-2.228-8.274-1.798-11.464,1.075c-7.669,6.908-15.45,13.287-23.472,19.277
      c1.669-5.571,3.124-11.052,4.372-16.425c14.212-8.177,25.591-21.501,33.036-38.759c6.87-15.927,10.143-34.776,9.217-53.076
      c-0.217-4.299-3.176-7.863-7.363-8.868c-4.198-1.009-8.464,0.828-10.616,4.571c-5.203,9.052-10.7,17.618-16.57,25.872
      c-0.072-6.961-0.395-13.721-0.963-20.242c-0.002-0.151,0-0.301-0.011-0.453c-1.619-21.534-5.588-43.117-11.797-64.148
      c-1.176-3.983-5.36-6.259-9.34-5.082c-3.983,1.176-6.258,5.358-5.082,9.341c3.816,12.926,6.729,26.069,8.738,39.272
      c-7.445-7.136-15.113-13.829-23.164-20.189c-3.272-2.587-7.813-2.778-11.297-0.475c-3.48,2.3-5.084,6.546-3.99,10.565
      c8.473,31.145,22.628,57.722,41.011,77.152c-0.424,5.459-1.043,11.064-1.875,16.805c-4.961-8.686-10.248-17.013-15.98-25.121
      c-2.382-3.37-6.644-4.847-10.605-3.68c-3.954,1.166-6.726,4.711-6.899,8.823c-0.927,21.967,1.25,54.007,16.463,83.761
      c-1.966,4.965-4.149,10.011-6.56,15.122c-2.236-9.697-4.889-19.136-8.032-28.485c-1.31-3.895-4.955-6.533-9.069-6.566
      c-0.026,0-0.051,0-0.077,0c-4.074,0-7.715,2.566-9.075,6.407c-10.121,28.576-13.075,58.411-8.457,84.481
      c-3.348,4.214-6.928,8.437-10.746,12.651c0.719-9.953,0.952-19.784,0.677-29.675c-0.114-4.112-2.831-7.702-6.761-8.935
      c-3.92-1.228-8.192,0.164-10.627,3.466c-17.986,24.386-29.718,52.086-33.316,78.439l-2.026-5.488
      c-1.592-4.312-5.75-7.209-10.346-7.209h-25.362c-3.443-5.568-6.601-11.551-9.406-17.85c-1.689-3.794-6.133-5.499-9.927-3.81
      c-3.794,1.69-5.5,6.134-3.81,9.927c1.795,4.03,3.726,7.947,5.774,11.733h-58.72c11.809-21.87,17.838-45.073,20.904-63.537
      c2.799,0.491,5.629,0.745,8.46,0.745c2.835,0,5.669-0.255,8.473-0.747c0.938,5.669,2.046,11.259,3.345,16.682
      c0.826,3.45,3.907,5.769,7.306,5.769c0.58,0,1.169-0.068,1.758-0.209c4.039-0.967,6.528-5.025,5.56-9.064
      c-1.405-5.868-2.588-11.941-3.542-18.113c2.199-1.158,4.338-2.486,6.391-3.999c7.743-5.705,14.743-12.226,20.936-19.385
      c19.009-1.56,37.251-9.019,52.115-21.668c20.741-17.65,32.636-43.388,32.636-70.614v-25.425c0-2.939-1.146-5.701-3.227-7.777
      c-2.074-2.069-4.827-3.206-7.753-3.206c-0.009,0-0.019,0-0.029,0l-42.055,0.092v-4.05c5.501-1.031,9.68-5.863,9.68-11.659v-18.032
      c0-6.545-5.325-11.87-11.87-11.87H176.276c-6.545,0-11.87,5.325-11.87,11.87v18.032c0,5.796,4.179,10.627,9.68,11.659v4.05
      l-42.053-0.092c-0.01,0-0.019,0-0.029,0c-2.928,0-5.681,1.139-7.755,3.206c-2.081,2.076-3.227,4.838-3.227,7.777v25.425
      c0,27.226,11.895,52.964,32.636,70.614c14.866,12.65,33.106,20.108,52.116,21.668c6.194,7.158,13.193,13.681,20.936,19.385
      c2.054,1.513,4.193,2.842,6.393,4c-3.031,19.577-9.608,45.467-23.828,68.472h-24.694c-4.596,0-8.754,2.897-10.347,7.211
      l-2.251,6.099c-0.134-0.091-0.265-0.183-0.4-0.275c-3.544-26.454-15.296-54.287-33.359-78.777
      c-2.435-3.301-6.706-4.693-10.627-3.466c-3.93,1.233-6.647,4.823-6.761,8.935c-0.275,9.892-0.042,19.723,0.676,29.675
      c-3.818-4.215-7.398-8.438-10.746-12.652c4.619-26.07,1.664-55.905-8.457-84.48c-1.369-3.865-5.032-6.44-9.153-6.408
      c-4.115,0.033-7.76,2.673-9.07,6.568c-3.143,9.348-5.796,18.787-8.032,28.483c-2.412-5.111-4.594-10.157-6.56-15.122
      c15.213-29.755,17.39-61.793,16.463-83.76c-0.173-4.113-2.945-7.658-6.899-8.824c-3.961-1.167-8.223,0.312-10.605,3.679
      c-5.732,8.107-11.02,16.435-15.98,25.122c-0.832-5.741-1.45-11.346-1.875-16.806c18.383-19.429,32.537-46.006,41.011-77.152
      c1.093-4.02-0.511-8.266-3.992-10.565c-3.483-2.301-8.023-2.11-11.294,0.475c-8.051,6.36-15.72,13.053-23.165,20.189
      c2.009-13.203,4.921-26.345,8.738-39.272c1.176-3.983-1.099-8.165-5.082-9.341c-3.978-1.172-8.164,1.099-9.34,5.082
      c-6.21,21.035-10.179,42.616-11.797,64.148c-0.011,0.149-0.008,0.296-0.011,0.444c-0.569,6.525-0.892,13.288-0.964,20.251
      c-5.869-8.254-11.366-16.82-16.57-25.872c-2.151-3.742-6.42-5.58-10.613-4.571c-4.187,1.004-7.147,4.567-7.365,8.867
      c-0.927,18.301,2.347,37.151,9.217,53.077c7.445,17.258,18.824,30.582,33.036,38.759c1.249,5.373,2.704,10.854,4.373,16.426
      c-8.023-5.991-15.805-12.371-23.474-19.279c-3.189-2.872-7.796-3.304-11.464-1.074c-3.66,2.224-5.394,6.502-4.317,10.644
      c8.188,31.484,31.934,65.891,66.938,73.821c2.745,4.751,5.714,9.541,8.909,14.355c-9.396-3.375-18.681-7.181-28.019-11.515
      c-3.885-1.805-8.412-0.865-11.263,2.334c-2.844,3.194-3.254,7.787-1.019,11.431c16.21,26.435,46.788,51.332,80.727,51.332
      c1.602,0,3.213-0.063,4.829-0.176c9.351,8.72,19.956,17.273,31.599,25.455c0.002,0.001,0.003,0.002,0.005,0.003l0,0
      c2.077,1.461,4.222,2.903,6.398,4.335l1.416-3.838l0,0l-6.328,17.148c-1.248,3.382-0.763,7.167,1.298,10.124
      c2.061,2.958,5.443,4.723,9.048,4.723h168.541c3.605,0,6.987-1.765,9.048-4.723s2.546-6.743,1.298-10.124l-5.042-13.663
      c1.99-1.316,3.954-2.641,5.86-3.982l0,0c0.002-0.001,0.003-0.002,0.005-0.003c11.643-8.182,22.247-16.735,31.598-25.454
      c1.616,0.114,3.226,0.176,4.829,0.176c33.937,0,64.519-24.899,80.728-51.333c2.234-3.644,1.824-8.238-1.021-11.43
      c-2.851-3.201-7.377-4.14-11.261-2.334c-9.338,4.334-18.623,8.14-28.02,11.515c3.194-4.813,6.164-9.604,8.909-14.355
      c35.004-7.93,58.75-42.337,66.939-73.822C505.553,235.7,503.818,231.422,500.159,229.199z M474.136,209.34
      c0.15-0.99,0.297-1.979,0.436-2.963c0.122-0.87,0.237-1.735,0.351-2.599c0.128-0.974,0.253-1.946,0.369-2.913
      c0.104-0.861,0.202-1.718,0.297-2.573c0.106-0.958,0.208-1.913,0.304-2.863c0.085-0.848,0.165-1.693,0.241-2.535
      c0.086-0.949,0.165-1.893,0.24-2.834c0.034-0.435,0.079-0.878,0.111-1.311c6.952-8.516,13.394-17.271,19.446-26.442
      c-2.484,18.036-9.537,36.156-22.039,48.697C473.979,210.446,474.052,209.896,474.136,209.34z M337.916,206.799v-28.814l38.026-0.083
      v21.362c0,22.811-9.967,44.374-27.344,59.161c-8.742,7.439-18.878,12.732-29.649,15.678
      C331.16,254.047,337.916,230.769,337.916,206.799z M163.404,258.425c-17.377-14.788-27.344-36.352-27.344-59.161v-21.362
      l38.025,0.083v28.814c0,23.97,6.757,47.249,18.968,67.305C182.282,271.158,172.145,265.863,163.404,258.425z M189.124,206.799
      v-47.691h9.811c4.153,0,7.519-3.366,7.519-7.519s-3.366-7.519-7.519-7.519h-19.491v-11.696h153.114v11.696H233.92
      c-4.153,0-7.519,3.366-7.519,7.519s3.366,7.519,7.519,7.519h88.958v47.691c0,36.17-17.385,70.572-46.506,92.024
      c-12.184,8.976-28.557,8.976-40.744,0C206.509,277.37,189.124,242.969,189.124,206.799z M16.072,162.307
      c6.053,9.172,12.494,17.927,19.446,26.442c0.033,0.442,0.078,0.894,0.113,1.338c0.073,0.93,0.152,1.863,0.237,2.801
      c0.076,0.844,0.156,1.69,0.242,2.54c0.095,0.952,0.198,1.909,0.304,2.868c0.095,0.853,0.192,1.708,0.296,2.568
      c0.117,0.969,0.242,1.943,0.37,2.92c0.113,0.86,0.228,1.721,0.349,2.587c0.14,0.993,0.289,1.992,0.44,2.992
      c0.083,0.549,0.155,1.091,0.242,1.642C25.608,198.462,18.556,180.344,16.072,162.307z M70.824,203.941
      c-0.878,15.831-3.833,30.919-8.683,44.395c-0.126-0.405-0.255-0.811-0.38-1.216c-0.251-0.819-0.498-1.635-0.74-2.45
      c-0.244-0.822-0.483-1.641-0.718-2.458c-0.233-0.812-0.462-1.622-0.685-2.43c-0.225-0.813-0.445-1.624-0.66-2.432
      c-0.214-0.803-0.423-1.603-0.627-2.401c-0.205-0.802-0.405-1.6-0.6-2.397s-0.387-1.591-0.572-2.382
      c-0.087-0.373-0.17-0.743-0.255-1.115C61.253,220.28,65.863,211.96,70.824,203.941z M49.754,162.273
      c0.011-0.87,0.027-1.737,0.047-2.601c0.02-0.877,0.044-1.751,0.072-2.621c0.028-0.856,0.06-1.709,0.097-2.558
      c0.037-0.861,0.078-1.718,0.123-2.572c0.044-0.84,0.093-1.675,0.146-2.507c0.054-0.852,0.112-1.699,0.174-2.543
      c0.03-0.408,0.065-0.812,0.097-1.219c6.826-7.337,13.778-14.164,20.993-20.608c-5.731,15.52-13.072,29.41-21.77,41.202
      c0-0.441-0.003-0.882-0.001-1.321C49.735,164.038,49.743,163.153,49.754,162.273z M28.914,254.765
      c8.454,6.763,17.13,13.041,26.194,18.958c0.155,0.396,0.324,0.796,0.481,1.192c0.34,0.856,0.686,1.715,1.038,2.575
      c0.316,0.773,0.637,1.546,0.963,2.322c0.365,0.866,0.737,1.735,1.114,2.605c0.337,0.779,0.678,1.558,1.025,2.34
      c0.388,0.872,0.783,1.747,1.183,2.622c0.359,0.787,0.72,1.574,1.089,2.363c0.41,0.877,0.829,1.756,1.25,2.636
      c0.236,0.493,0.461,0.983,0.701,1.477C48.512,285.721,36.557,270.86,28.914,254.765z M93.201,277.644
      c3.717,15.199,5.241,30.396,4.493,44.714c-0.234-0.344-0.471-0.689-0.703-1.033c-0.472-0.7-0.938-1.4-1.4-2.099
      c-0.473-0.716-0.941-1.432-1.404-2.148c-0.455-0.703-0.905-1.405-1.35-2.106c-0.453-0.715-0.901-1.428-1.343-2.142
      c-0.43-0.693-0.856-1.386-1.277-2.078c-0.439-0.724-0.873-1.446-1.301-2.167c-0.399-0.671-0.793-1.342-1.182-2.011
      c-0.201-0.346-0.396-0.691-0.594-1.037C88.766,295.931,90.773,286.69,93.201,277.644z M67.812,338.231
      c10.046,3.984,20.155,7.448,30.524,10.464c0.253,0.321,0.52,0.642,0.776,0.964c0.601,0.755,1.208,1.509,1.823,2.264
      c0.515,0.632,1.034,1.264,1.559,1.896c0.617,0.743,1.241,1.485,1.871,2.227c0.543,0.639,1.088,1.278,1.641,1.917
      c0.64,0.741,1.29,1.481,1.943,2.22c0.56,0.634,1.122,1.268,1.692,1.902c0.677,0.753,1.364,1.505,2.054,2.256
      c0.353,0.384,0.693,0.769,1.05,1.153C95.577,362.159,79.8,351.398,67.812,338.231z M152.691,382.388
      c-0.674-0.544-1.342-1.089-2.005-1.635c-0.665-0.548-1.325-1.096-1.98-1.645c-0.664-0.557-1.322-1.114-1.975-1.673
      c-0.639-0.547-1.273-1.095-1.902-1.644c-0.643-0.561-1.281-1.124-1.913-1.687c-0.617-0.55-1.229-1.101-1.835-1.652
      c-0.619-0.563-1.233-1.126-1.84-1.69c-0.289-0.269-0.572-0.538-0.859-0.807c-1.298-9.714-2.11-19.19-2.445-28.608
      c8.087,13.565,14.122,27.791,17.76,41.845C153.362,382.924,153.024,382.656,152.691,382.388z M177.818,424.336l9.557-25.896h26.007
      c0.005,0,0.009,0.001,0.014,0.001s0.011-0.001,0.016-0.001h85.179c0.005,0,0.011,0.001,0.016,0.001s0.009-0.001,0.014-0.001h26.675
      l9.557,25.896H177.818z M373.62,369.955c-0.294,0.276-0.584,0.552-0.881,0.827c-0.594,0.552-1.194,1.102-1.799,1.652
      c-0.616,0.561-1.238,1.121-1.865,1.68c-0.626,0.558-1.258,1.114-1.895,1.67c-0.632,0.552-1.27,1.103-1.913,1.653
      c-0.65,0.556-1.306,1.112-1.967,1.667c-0.657,0.551-1.319,1.101-1.987,1.651c-0.662,0.545-1.329,1.088-2.001,1.631
      c-0.333,0.269-0.671,0.536-1.007,0.805c3.638-14.054,9.672-28.279,17.76-41.845C375.73,350.764,374.919,360.238,373.62,369.955z
      M418.801,277.644c2.429,9.046,4.435,18.286,6.061,27.894c-0.193,0.337-0.383,0.673-0.578,1.01
      c-0.397,0.683-0.799,1.367-1.206,2.053c-0.425,0.716-0.855,1.433-1.291,2.151c-0.419,0.689-0.843,1.38-1.272,2.071
      c-0.447,0.721-0.899,1.442-1.358,2.164c-0.438,0.69-0.881,1.381-1.328,2.073c-0.47,0.727-0.946,1.454-1.427,2.182
      c-0.457,0.692-0.919,1.385-1.386,2.078c-0.233,0.346-0.471,0.692-0.707,1.039C413.56,308.041,415.084,292.843,418.801,277.644z
      M444.191,338.23c-11.988,13.169-27.764,23.931-44.934,27.265c0.387-0.418,0.758-0.836,1.141-1.254
      c0.643-0.701,1.283-1.401,1.914-2.102c0.607-0.674,1.205-1.349,1.8-2.024c0.619-0.701,1.234-1.402,1.841-2.104
      c0.585-0.676,1.162-1.352,1.735-2.028c0.596-0.703,1.188-1.406,1.772-2.109c0.559-0.672,1.111-1.345,1.659-2.017
      c0.578-0.71,1.149-1.419,1.714-2.129c0.274-0.344,0.561-0.689,0.832-1.033C424.033,345.679,434.145,342.214,444.191,338.23z
      M440.499,125.045c7.215,6.443,14.168,13.271,20.993,20.608c0.033,0.414,0.068,0.826,0.099,1.242
      c0.062,0.832,0.119,1.668,0.172,2.508c0.053,0.836,0.102,1.675,0.147,2.518c0.045,0.853,0.086,1.71,0.123,2.571
      c0.036,0.849,0.069,1.701,0.097,2.557c0.028,0.869,0.052,1.741,0.072,2.618c0.02,0.864,0.035,1.731,0.047,2.601
      c0.012,0.886,0.019,1.775,0.022,2.668c0.001,0.435-0.001,0.873-0.002,1.31C453.571,154.455,446.23,140.564,440.499,125.045z
      M441.179,203.941c4.961,8.019,9.572,16.341,13.921,25.115c-0.085,0.372-0.167,0.742-0.255,1.115
      c-0.185,0.791-0.376,1.584-0.572,2.38c-0.196,0.799-0.396,1.6-0.602,2.404c-0.203,0.794-0.412,1.59-0.624,2.388
      c-0.217,0.814-0.438,1.631-0.665,2.45c-0.222,0.8-0.448,1.603-0.679,2.408c-0.236,0.824-0.478,1.651-0.724,2.479
      c-0.241,0.81-0.486,1.623-0.736,2.437c-0.124,0.405-0.254,0.813-0.381,1.219C445.011,234.86,442.057,219.773,441.179,203.941z
      M448.051,293.856c0.239-0.492,0.462-0.98,0.697-1.47c0.425-0.886,0.847-1.771,1.259-2.654c0.364-0.779,0.72-1.556,1.074-2.332
      c0.405-0.887,0.805-1.772,1.197-2.655c0.343-0.773,0.68-1.544,1.014-2.314c0.38-0.876,0.754-1.751,1.121-2.624
      c0.325-0.773,0.644-1.543,0.96-2.313c0.353-0.862,0.7-1.722,1.04-2.579c0.157-0.396,0.326-0.796,0.48-1.191
      c9.064-5.917,17.739-12.194,26.194-18.958C475.445,270.859,463.49,285.721,448.051,293.856z"/>
  </svg>
);

GoldCup.propTypes = {
  height: PropTypes.number.isRequired,
};

