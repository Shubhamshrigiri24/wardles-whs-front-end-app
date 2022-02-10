STACK="services-online-$STAGE"
REGION="eu-west-2"

if ! aws cloudformation describe-stacks --region "$REGION" --stack-name "$STACK" ; then
  aws cloudformation create-stack \
    --stack-name "$STACK" \
    --template-body file://template.yml \
    --region "$REGION" \
    --parameters "file://$STAGE-config.json"

    echo "Waiting for stack to be created ..."
    aws cloudformation wait stack-create-complete \
      --region "$REGION" \
      --stack-name "$STACK"
else
  update_output=$(aws cloudformation update-stack \
    --stack-name "$STACK" \
    --template-body file://template.yml \
    --region "$REGION" \
    --parameters "file://$STAGE-config.json" 2>&1)
  status=$?
  set -e

  if [ $status -ne 0 ] ; then

    # Don't fail for no-op update
    if [[ $update_output == *"ValidationError"* && $update_output == *"No updates"* ]] ; then
      echo -e "\nFinished create/update - no updates to be performed"
      exit 0
    else
      exit $status
    fi

  fi

  echo "Waiting for stack update to complete ..."
  aws cloudformation wait stack-update-complete \
    --region "$REGION" \
    --stack-name "$STACK"
fi

