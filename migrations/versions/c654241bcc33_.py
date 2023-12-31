"""empty message

Revision ID: c654241bcc33
Revises: 1f8647c5c1a7
Create Date: 2023-08-21 04:02:41.227310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c654241bcc33'
down_revision = '1f8647c5c1a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mensajes_enviados', schema=None) as batch_op:
        batch_op.add_column(sa.Column('isMessage', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mensajes_enviados', schema=None) as batch_op:
        batch_op.drop_column('isMessage')

    # ### end Alembic commands ###
