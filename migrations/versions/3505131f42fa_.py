"""empty message

Revision ID: 3505131f42fa
Revises: 2b770d543a47
Create Date: 2023-08-21 07:16:06.939338

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3505131f42fa'
down_revision = '2b770d543a47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.add_column(sa.Column('precio_envio', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pedido', schema=None) as batch_op:
        batch_op.drop_column('precio_envio')

    # ### end Alembic commands ###
