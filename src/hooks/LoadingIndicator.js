const LoadingIndicator = ({isLoading}) => {
    if(!isLoading){
        return null
    }

    return (
        <h1>Loading...</h1>
    )
}

export default LoadingIndicator