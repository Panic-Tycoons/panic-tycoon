
FUNCTIONS=($(grep -r -o "function \w\w*" "function\s*(\w\w*)" js | grep -oE '[^ ]+$'))



for function  in "${FUNCTIONS[@]}"
do
	if ! grep -r --quiet $function tests ; then
  		echo $function
	fi
done


