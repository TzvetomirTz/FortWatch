
MODEL_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"/yolo.h5


if [ -f "$MODEL_PATH" ]; then
    echo "$MODEL_PATH exists. Proceeding further..."
else 
    echo "The ML model is not present in the current directory, expected at path: $MODEL_PATH. Please before building the docker run the secure_model.py script to download it there or move it manually to the expected location!"
    exit 1
fi

docker build --tag detective-container .
