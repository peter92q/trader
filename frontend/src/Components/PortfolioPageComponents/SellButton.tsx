const styless = {
    button: `cursor-pointer font-normal font-normal text-[17px] sm:text-[20px] 
  bg-gradient-to-r from-[#ac1161] via-pink-700 to-pink-900 text-white text-center 
  rounded-sm hover:opacity-70 sm:ml-[30px] md:ml-[40px] lg:ml-[50px] mt-[20px] sm:mt-0 px-[40px] sm:px-[50px]`
}

export default function SellButton({clicked, sellCrypto}:{clicked: boolean, sellCrypto: ()=>void}) {

  return (
    <button
            onClick={sellCrypto}
            className={`${styless.button} sell-button ${
            clicked ? 'soldanimate' : ''
            }`}
        >
            {clicked ? (
            <span className="icon-container">
                <svg
                fill="#e0dbdb"
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                >
                <title>moneybag</title>
                <path d="M14.017 9.302h3.934v-1.476h-3.934v1.476zM17.922 9.793h-3.905c0 0-6.425 6.333-6.425 12.542 0 6.579 6.732 7.102 6.732 7.102s2.008 0.333 3.257 0c0 0 6.826-0.8 6.826-7.070 0.001-6.272-6.485-12.574-6.485-12.574zM18.211 23.123c-0.158 0.32-0.371 0.588-0.643 0.802-0.271 0.215-0.588 0.376-0.949 0.484-0.046 0.014-0.096 0.019-0.143 0.031v1.092h-0.983v-0.964c-0.012 0.001-0.024 0.003-0.036 0.003-0.279 0-0.538-0.022-0.778-0.067s-0.45-0.101-0.634-0.164c-0.184-0.064-0.337-0.131-0.459-0.201s-0.212-0.132-0.266-0.186c-0.055-0.054-0.093-0.132-0.116-0.234-0.022-0.103-0.034-0.249-0.034-0.441 0-0.129 0.004-0.237 0.013-0.325s0.021-0.158 0.041-0.213c0.019-0.055 0.043-0.093 0.074-0.116 0.031-0.022 0.068-0.034 0.109-0.034 0.059 0 0.141 0.034 0.247 0.103s0.242 0.145 0.409 0.228c0.167 0.084 0.365 0.159 0.597 0.229 0.231 0.068 0.499 0.103 0.803 0.103 0.2 0 0.379-0.024 0.537-0.072s0.293-0.115 0.403-0.203c0.111-0.088 0.195-0.196 0.253-0.325 0.059-0.13 0.088-0.273 0.088-0.433 0-0.183-0.051-0.34-0.15-0.472-0.1-0.131-0.231-0.247-0.391-0.35-0.16-0.102-0.342-0.197-0.546-0.287s-0.415-0.185-0.631-0.284c-0.217-0.1-0.427-0.213-0.631-0.341-0.204-0.127-0.387-0.278-0.547-0.455s-0.29-0.387-0.391-0.628c-0.1-0.241-0.149-0.531-0.149-0.868 0-0.388 0.072-0.728 0.215-1.021s0.338-0.537 0.581-0.73c0.244-0.193 0.531-0.338 0.862-0.434 0.17-0.049 0.346-0.085 0.526-0.108v-1.035h0.983v1.034c0.040 0.005 0.079 0.003 0.118 0.009 0.191 0.029 0.371 0.068 0.537 0.118s0.314 0.105 0.443 0.167 0.215 0.113 0.256 0.155c0.043 0.041 0.070 0.076 0.086 0.105 0.014 0.029 0.025 0.068 0.037 0.116 0.010 0.048 0.018 0.108 0.021 0.182 0.004 0.072 0.006 0.163 0.006 0.271 0 0.121-0.004 0.224-0.010 0.308-0.006 0.083-0.016 0.152-0.031 0.206-0.014 0.055-0.035 0.094-0.062 0.119s-0.062 0.037-0.109 0.037c-0.045 0-0.119-0.028-0.219-0.086-0.1-0.059-0.223-0.121-0.367-0.189-0.146-0.068-0.314-0.13-0.506-0.187-0.193-0.056-0.403-0.083-0.631-0.083-0.18 0-0.336 0.021-0.469 0.065-0.134 0.043-0.245 0.104-0.335 0.18-0.089 0.077-0.156 0.17-0.199 0.277-0.044 0.107-0.065 0.222-0.065 0.342 0 0.18 0.049 0.335 0.146 0.466s0.229 0.248 0.394 0.35c0.164 0.103 0.351 0.198 0.56 0.287 0.208 0.090 0.42 0.185 0.637 0.284 0.217 0.101 0.428 0.214 0.637 0.341s0.395 0.279 0.557 0.456 0.293 0.385 0.393 0.624c0.1 0.24 0.15 0.521 0.15 0.847-0.001 0.422-0.081 0.794-0.239 1.115zM17.891 7.334l1.998-4.919c0 0-1.26 1.046-1.998 1.046s-1.907-1.015-1.907-1.015-1.26 1.015-1.998 1.015c-0.737 0-1.937-0.984-1.937-0.984l2.029 4.857h3.813z"></path>
                </svg>
            </span>
            ) : (
            'Sell'
            )}
        </button>
)
}
